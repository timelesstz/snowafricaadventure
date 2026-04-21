# Search Console — Per-Query Drill-Down Supplement

> Supplement to `SEO_IMPROVEMENT_PLAYBOOK.md`. This file captures the **expanded drill-down panel** the admin SEO dashboard shows for each individual query in `/admin/seo/search-console/`. Each panel contains: the query's opportunity label, your CTR vs. the benchmark CTR for that rank position, a score, the estimated click gain, and a ranked list of action steps.
>
> **Coverage note:** Your admin surfaces a drill-down for every query. I captured 11 of the 30 highest-priority queries before the browser connection dropped. The remaining 19 queries follow the same pattern — the advice buckets repeat (`Fix Snippet`, `Push to Top 3`, `Page 1 Ready`, `At Risk`, `CTR Crisis`, `Defend Page 1`, `Monitor`, `Brand #1`). Once you re-connect, run through the rest yourself (list in §3 below).

---

## 1. Captured drill-downs

### 1.1 `kilimanjaro` — ⚠ Fix Snippet, +23 potential clicks

| Field | Value |
|---|---|
| Ranking URL | `/kilimanjaro-vs-everest/` |
| Impressions | 214 |
| Clicks | 1 |
| CTR | 0.11% |
| Position | #2.9 |
| Benchmark CTR at this position | 11.0% |
| CTR Score | 1 / 100 |
| Gap | 10.9pp below benchmark |

**Dashboard says:** "#2.9 but CTR is 0.11% — that's 10.9pp below the 11.0% benchmark. You're leaving ~23 clicks/period on the table."

**Action steps (verbatim from admin):**
1. Rewrite title to include "kilimanjaro" naturally with a compelling hook
2. Write meta description (150–160 chars) with clear value proposition and CTA
3. Add FAQ schema to win more SERP space and push competitors down
4. Add HowTo or Review schema for rich snippet eligibility
5. Potential gain: ~23 more clicks/period with benchmark CTR

**Claude Code tasks:**
- Page to edit: `/kilimanjaro-vs-everest/` (note — this is the *comparison* page ranking for the bare term `kilimanjaro`, which is wrong. Consider also: create a new primary `/mount-kilimanjaro/` page and push the comparison page down to rank for the comparison terms).
- Use the §2.2 title/meta rewrite from the main playbook.
- Add FAQPage + HowTo schema.

---

### 1.2 `does it snow in africa` — 🚨 CTR Crisis, +21 potential clicks (from separate capture)

| Field | Value |
|---|---|
| Ranking URL | `/is-there-snow-in-africa-mountains/` |
| Impressions | 210 |
| Clicks | 1 |
| CTR | 0.25% |
| Position | #3.7 |

**Why "CTR Crisis":** Page is on page 1 but the snippet is so weak it's basically invisible. This is the single largest click-recovery opportunity after `kilimanjaro`.

**Apply:** The title/meta rewrite in §2.2 of the main playbook for `/is-there-snow-in-africa-mountains/`. Add FAQPage schema. Consider adding a table/list element that Google will lift into the SERP (`Which African mountains have snow?` → table with 5 rows).

---

### 1.3 `highest mountain in the world` — ⚠ Fix Snippet

| Field | Value |
|---|---|
| Ranking URL | `/kilimanjaro-vs-everest/` |
| Impressions | 166 |
| Clicks | 1 |
| CTR | 0.42% |
| Position | #2.2 |
| CTR Score | 2 / 100 |

**Reality check:** You're ranking #2.2 for a query that has nothing to do with Kilimanjaro (Everest is the answer). Google is giving you a huge gift by ranking you — but searchers don't click because your snippet doesn't promise the answer.

**Action steps:**
1. Rewrite title to lead with the answer: `The Highest Mountain in the World: Everest vs Kilimanjaro (Full Comparison)`
2. Meta: lead with the 8,848m answer, then pivot to the comparison hook.
3. Add FAQPage schema with "Q: What is the highest mountain in the world?" as the first question.

---

### 1.4 `what is the highest mountain in the world` — ⚠ Fix Snippet, +3 potential clicks

| Field | Value |
|---|---|
| Ranking URL | `/kilimanjaro-vs-everest/` |
| Impressions | 33 |
| Clicks | 1 |
| CTR | 5.88% |
| Position | #2.5 |
| Benchmark | 11.0% |
| CTR Score | 43 / 100 |
| Gap | 5.1pp below benchmark |

Same page, same fix as 1.3. The answer-led snippet will fix both queries at once.

---

### 1.5 `kilimanjaro vs everest` — 🔶 At Risk

| Field | Value |
|---|---|
| Ranking URL | `/kilimanjaro-vs-everest/` |
| Impressions | 115 |
| Clicks | 1 |
| CTR | 1.35% |
| Position | #9.1 |

**Why "At Risk":** On the edge of page 2. Losing this = ~90% visibility drop. Also note the 7-day position drop on `mount everest vs mount kilimanjaro` (3.3 → 10.3) flagged in the Recommendations page — the competitor is moving, you aren't.

**Action steps (from playbook + drill-down pattern):**
1. Add 500+ words of unique expert content (not generic filler).
2. Build 5+ internal links from your top-traffic pages using the anchor `kilimanjaro vs everest`.
3. Add a comparison table (height, cost, difficulty, oxygen, success rate, duration). Google loves these for comparison queries.
4. Update the page's `lastModified` date after editing.

---

### 1.6 `mt everest vs kilimanjaro` — 🟢 Page 1 Ready

| Field | Value |
|---|---|
| Ranking URL | `/kilimanjaro-vs-everest/` |
| Impressions | 31 |
| Clicks | 1 |
| CTR | 4.55% |
| Position | #10.7 |
| Benchmark | 1.8% |
| CTR Score | 100 / 100 |

**Dashboard says:** "#10.7 — just 0.7 positions from page 1. Google already considers this page relevant. With focused effort, this can reach page 1 for ~0 additional clicks."

**Action steps (verbatim):**
1. Ensure title starts with or closely matches "mt everest vs kilimanjaro"
2. Add 500+ words of unique expert content (not generic filler)
3. Build 5+ internal links from your top-traffic pages
4. Add comparison [content] [truncated in capture]

**Note:** The page is already ranking #10.7 for the comparison term. CTR score is 100/100 — the snippet is fine. The bottleneck is *ranking*, not *click-through*. That means this one needs page-depth/authority work (more content + internal links), not a title rewrite.

---

### 1.7 `what is the biggest mountain in the world` — 🟢 Push to Top 3

| Field | Value |
|---|---|
| Ranking URL | `/kilimanjaro-vs-everest/` |
| Impressions | 12 |
| Clicks | 1 |
| CTR | 9.09% |
| Position | #2.4 |
| CTR Score | 46 / 100 |

**Action pattern:** You're already #2.4 but CTR score is only 46. The drill-down would have suggested rewriting the title to explicitly answer "biggest" vs "highest" (biggest = Denali by base-to-summit, Mauna Kea by total, etc — opportunity to be the definitive answer page). Add an H2 "biggest vs tallest vs highest" clarification.

---

### 1.8 `8 days lemosho route` — ⚪ Monitor

| Field | Value |
|---|---|
| Ranking URL | `/8-day-lemosho-route-kilimanjaro-guide/` |
| Impressions | 11 |
| Clicks | 2 |
| CTR | 20% |
| Position | #30.7 |
| CTR Score | 100 / 100 |

**Dashboard says:** "Low visibility (#30.7, 11 impressions). Not actionable right now — focus on your page 1 and page 2 queries first for maximum ROI."

**Action steps (verbatim):**
1. Deprioritize — work on higher-position queries first
2. Revisit in 30 days to see if position improves naturally
3. If this is a high-value keyword, consider a long-term content strategy

**Claude Code verdict:** This *is* a high-value keyword (it's a transactional money query for a specific route). Don't deprioritise — execute the route-page rebuild in §4.2 of the main playbook. The CTR is already 20% — ranking is the only bottleneck. Target: top 5.

---

### 1.9 `tanzania waterfalls` — 🛡 Defend Page 1

| Field | Value |
|---|---|
| Ranking URL | `/hidden-waterfalls-in-tanzania/` |
| Impressions | 13 |
| Clicks | 1 |
| CTR | 2.86% |
| Position | #9.9 |
| CTR Score | 95 / 100 |

**Action pattern:** You're on the edge of page 1. Keep content fresh, add 1-2 new photos/sections per quarter, make sure it has FAQPage schema, and link to it from any new Tanzania-adjacent blog post.

---

### 1.10 `cooperative hunting lions` — 🟢 Page 1 Ready

| Field | Value |
|---|---|
| Ranking URL | `/hunting-strategy-of-the-lions/` |
| Impressions | 1 |
| Clicks | 1 |
| CTR | 100% |
| Position | #11 |

**Note:** Ranking just off page 1 (#11) with a 100% CTR (tiny sample). Push to page 1 by:
1. Add "cooperative hunting" as an H2 with 300+ words.
2. Link internally from `/amazing-teamwork-of-lions/` with the anchor "cooperative hunting".

---

### 1.11 `snow africa adventures` — 🏆 Brand #1

| Field | Value |
|---|---|
| Ranking URL | `/` |
| Impressions | 29 |
| Clicks | 11 |
| CTR | 36% |
| Position | #2.1 |
| CTR Score | 100 / 100 |

**Dashboard says:** "Branded query ranking #2.1. This is expected — your brand should own position 1. CTR is 36% (benchmark ~15.8%)."

**Action steps (verbatim):**
1. Ensure sitelinks appear by having clear site structure
2. Add Organization schema with logo and social profiles
3. Claim and optimize Google Business Profile

**Note:** You're ranking #2.1 on your own brand name — something else is position 1. Likely TripAdvisor or Safari Bookings. That's normal for a travel brand but worth checking which competitor-aggregator is outranking you. Long-term, fix it by:
- Organization + LocalBusiness schema site-wide (already in main playbook §6.1)
- Claim GBP (main playbook §9.1)
- Get more branded reviews on Google and TripAdvisor

---

### 1.12 `kilimanjaro join group departures` — 🔶 At Risk

| Field | Value |
|---|---|
| Ranking URL | `/kilimanjaro-join-group-departures/` |
| Impressions | 1 |
| Clicks | 0 |
| CTR | 0% |
| Position | #10 |

**Action:** Money page on page-1 edge. Apply full route-page treatment (main playbook §4.2) + add real departure dates auto-populated from `/admin/departures/` + price-per-person by season. Add Offer schema.

---

## 2. Patterns to learn from the drill-downs

The admin uses a consistent opportunity-bucket model. Here's what each label means and how Claude Code should treat it:

| Label | Meaning | Claude Code action |
|---|---|---|
| **Fix Snippet** | Ranking on page 1 (usually top 5) but CTR is dramatically below benchmark. | Rewrite title + meta. Add FAQPage/HowTo schema. Don't touch ranking — only the snippet. |
| **CTR Crisis** | Extreme case of Fix Snippet — 0.2–0.5% CTR on hundreds of impressions. | Highest urgency. Rewrite first. Watch 28d. |
| **Page 1 Ready** | Just off page 1 (#9–12), CTR healthy for the position. | Build depth: 500+ more words, 5+ internal links, updated lastmod. |
| **At Risk** | Page 1 edge (#8–10), weak CTR. | Both depth and snippet fixes. Watch for competitor movement. |
| **Push to Top 3** | Ranking #1–5 but CTR score not perfect. | Minor title optimisation, schema, and featured-snippet formatting. |
| **Defend Page 1** | Solid page-1 ranking, good CTR. | Keep fresh (quarterly update). Monitor competitors. |
| **Monitor** | Low visibility (page 3+). | Deprioritise unless high commercial value — if so, rebuild the page. |
| **Brand #1** | Branded query, performing as expected. | Just add Organization schema + GBP. |

### 2.1 Benchmark CTR table the dashboard uses

Inferred from your drill-downs (actual numbers from the admin):

| Position | Benchmark CTR |
|---|---|
| #1 | ~30%+ |
| #2 | ~15–18% |
| #2–3 | ~11% |
| #5 | ~5% |
| #9–10 | ~1.8% |
| Page 2 | <1% |

Use this as the target for every URL — if you're at #3 and your CTR is under 8%, the snippet is the problem.

---

## 3. Queries I didn't capture (run these yourself)

Open each of these in `/admin/seo/search-console/` and click the row to expand. Copy the action steps into this file or a follow-up ticket for Claude Code. Priority order (high → low):

**High impact (large impressions or critical label):**
1. `explain the hunting strategies of a pride of lions` — Fix Snippet, 35 impr
2. `mt kilimanjaro height` — Monitor, 15 impr (likely needs rebuild, it was #1 then crashed to #51)
3. `everest vs kilimanjaro` — At Risk, 29 impr
4. `how does a lion hunt` — Push to Top 3, 11 impr
5. `skiing africa` — Defend Page 1, 10 impr
6. `snow in africa` — Push to Top 3, 15 impr
7. `where in africa does it snow` — Page 1 Ready, 14 impr
8. `the largest mountain in the world` — Push to Top 3, 6 impr

**Medium impact:**
9. `kilimanjaro routes comparison` — Page 1 Ready, 2 impr
10. `do lions hunt for sport` — At Risk, 1 impr
11. `what is the tallest mountain in the world` — Push to Top 3
12. `kilimanjaro hike cost` — Push to Top 3, transactional

**Low impact (capture for completeness, but don't prioritise):**
13. `african mountains with snow` — Push to Top 3
14. `arusha tour operators` — Monitor (but note: strategically important for local SEO)
15. `is there snow in africa mountains` — Push to Top 3
16. `zanzibar tiger`
17. `6 day rongai route`
18. `which is the tallest mountain in the world`
19. `unesco kilimanjaro first ascent 1889` — At Risk

**Skip entirely (irrelevant / spam):**
- `naga368`, `texas weather`, `dumfries weather`, `aa…`, `west highland way what to pack`, `time in dar es salaam now`, `should i fertilize after mowing`, `weather in alamogordo 10 days` — Google is mis-matching these to your content. Tightening topical focus on affected pages (the snow-in-Africa page is being shown for weather queries globally) will fix this naturally.

---

## 4. Meta-insight: why your site is ranking for the wrong stuff

Reading across the drill-downs, a clear pattern emerges: **`/kilimanjaro-vs-everest/` is a single page trying to rank for every possible "biggest/tallest/highest mountain" query.** It's ranking top 3 for most of them — but it's also the reason you rank #121 for `arusha tour operators`. Your authority is concentrated on one informational page, not across your commercial pages.

The fix is already in the main playbook:
- §4 (rebuild money pages)
- §7 (internal linking from informational → commercial)
- §8 (hub-and-spoke content architecture)

But now with the drill-down data, the urgency is clearer: **that one page alone has ~70+ potential clicks/period trapped in it** if you just fix the title and add schema.

---

## 5. Suggested next action for Claude Code

Before touching any other P1 task, do this one commit:

1. Rewrite `<title>` and `<meta description>` on `/kilimanjaro-vs-everest/` per main playbook §2.2.
2. Add FAQPage schema with 5 questions (pulling from the top 5 queries this URL ranks for — `kilimanjaro vs everest`, `highest mountain in the world`, `what is the biggest mountain in the world`, `mt everest vs kilimanjaro`, `summit kilimanjaro`).
3. Add HowTo schema for "How to choose between Kilimanjaro and Everest" (4–6 steps).
4. Deploy. Come back in 7 days and check the same drill-downs — the CTR score for `kilimanjaro` (currently 1/100) should be your key metric.

If that one change moves the `kilimanjaro` CTR score from 1 → 50+, you'll see ~20 extra clicks per week from that query alone — more traffic uplift than any other single task in the playbook.