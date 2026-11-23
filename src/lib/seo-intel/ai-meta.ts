import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { KIND_LABEL, META_DESCRIPTION_MAX, META_DESCRIPTION_MIN, META_TITLE_MAX } from "./paths";
import type { MetaContent } from "./meta-content";

/**
 * Claude-written title/description suggestions. Runs only when an editor asks
 * for one; nothing is saved until they review and apply it.
 */

export const AI_MODEL = "claude-opus-5-5";

const SuggestionSchema = z.object({
  primaryQuery: z.string().describe("The search query this snippet is written to win"),
  metaTitle: z.string().describe(`Title tag text, at most ${META_TITLE_MAX} characters, no brand suffix`),
  metaDescription: z
    .string()
    .describe(`Meta description, ${META_DESCRIPTION_MIN}-${META_DESCRIPTION_MAX} characters`),
  rationale: z.string().describe("One or two sentences on why this should earn more clicks"),
});

export type MetaSuggestion = z.infer<typeof SuggestionSchema> & {
  warnings: string[];
};

export interface QueryContext {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
}

export class AiUnavailableError extends Error {}

const SYSTEM = `You write search snippets (title tag and meta description) for Snow Africa Adventure, a Tanzania-based operator of Kilimanjaro treks, safaris, Zanzibar trips and day tours.

Write for the searcher who sees the snippet on Google:
- Lead with the query the page already earns impressions for, in natural wording.
- Use only facts present in the page content provided: never invent prices, durations, ratings, awards or guarantees.
- The site appends " | Snow Africa Adventure" to every title, so do not add the brand to the title.
- Title: at most ${META_TITLE_MAX} characters. Description: ${META_DESCRIPTION_MIN}-${META_DESCRIPTION_MAX} characters, one concrete benefit and a clear next step.
- Plain, confident British English. No clickbait, no ALL CAPS, no emoji, no exclamation marks.`;

function buildPrompt(content: MetaContent, queries: QueryContext[]): string {
  const queryLines = queries.length
    ? queries
        .map(
          (q) =>
            `- "${q.query}": ${q.impressions} impressions, ${q.clicks} clicks, avg position ${q.position.toFixed(1)}`
        )
        .join("\n")
    : "- No Search Console data for this page yet.";
  return `Page type: ${KIND_LABEL[content.kind]}
Page name: ${content.title}
URL path: ${content.path}
Current title tag: ${content.metaTitle || "(none, falls back to the page name)"}
Current meta description: ${content.metaDescription || "(none)"}

Search queries this page appeared for in the last 28 days:
${queryLines}

Page content (excerpt):
${content.excerpt || "(no body text)"}

Write a better title tag and meta description for this page.`;
}

export function validateSuggestion(s: { metaTitle: string; metaDescription: string }): string[] {
  const warnings: string[] = [];
  if (s.metaTitle.length > META_TITLE_MAX)
    warnings.push(`Title is ${s.metaTitle.length} characters; Google may cut it after ${META_TITLE_MAX}.`);
  if (/snow africa/i.test(s.metaTitle)) warnings.push("Title repeats the brand, which the site already appends.");
  if (s.metaDescription.length < META_DESCRIPTION_MIN)
    warnings.push(`Description is ${s.metaDescription.length} characters; aim for at least ${META_DESCRIPTION_MIN}.`);
  if (s.metaDescription.length > META_DESCRIPTION_MAX)
    warnings.push(`Description is ${s.metaDescription.length} characters; Google may cut it after ${META_DESCRIPTION_MAX}.`);
  return warnings;
}

export async function suggestMeta(content: MetaContent, queries: QueryContext[]): Promise<MetaSuggestion> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new AiUnavailableError("AI suggestions need ANTHROPIC_API_KEY set on the server.");
  }
  const client = new Anthropic();
  try {
    const response = await client.beta.messages.parse({
      model: AI_MODEL,
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      thinking: { type: "adaptive" },
      output_config: { effort: "low", format: betaZodOutputFormat(SuggestionSchema) },
      system: SYSTEM,
      messages: [{ role: "user", content: buildPrompt(content, queries) }],
    });
    if (response.stop_reason === "refusal") {
      throw new AiUnavailableError("The model declined to write a suggestion for this page.");
    }
    const parsed = response.parsed_output;
    if (!parsed) throw new AiUnavailableError("The model returned no usable suggestion. Try again.");
    const clean = {
      ...parsed,
      metaTitle: parsed.metaTitle.trim(),
      metaDescription: parsed.metaDescription.trim(),
    };
    return { ...clean, warnings: validateSuggestion(clean) };
  } catch (error) {
    if (error instanceof AiUnavailableError) throw error;
    if (error instanceof Anthropic.AuthenticationError)
      throw new AiUnavailableError("The Anthropic API key was rejected. Check ANTHROPIC_API_KEY.");
    if (error instanceof Anthropic.RateLimitError)
      throw new AiUnavailableError("The AI service is busy. Try again in a minute.");
    if (error instanceof Anthropic.APIError) {
      console.error("[seo-ai] Anthropic API error", error.status, error.message);
      throw new AiUnavailableError("The AI service returned an error. Try again shortly.");
    }
    throw error;
  }
}
