/**
 * Content Processor
 * Transforms migrated WordPress HTML content into well-structured, styled content
 */

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, "...")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

export function processContent(html: string): string {
  let content = html;

  // Transform h3 tags that start with numbers into styled headings
  // e.g., <h3>1. The Exact Height</h3> -> <h3 class="numbered-heading">...</h3>
  content = content.replace(
    /<h3([^>]*)>(\d+)[.\)]\s*([^<]+)<\/h3>/gi,
    (match, attrs, num, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      return `<h3${attrs} class="numbered-heading" id="${id}"><span class="heading-number">${num}</span>${text}</h3>`;
    }
  );

  // Also handle h3 tags without numbers - add IDs for navigation
  content = content.replace(
    /<h3([^>]*)>([^<]+)<\/h3>/gi,
    (match, attrs, text) => {
      if (attrs.includes('class="numbered-heading"')) return match; // Already processed
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      if (attrs.includes('id=')) return match; // Already has ID
      return `<h3${attrs} id="${id}">${text}</h3>`;
    }
  );

  // Convert definition-style content (Bold: value)
  // e.g., "Meters: 5,895 m" -> styled definition
  content = content.replace(
    /<strong>([^<:]+):<\/strong>\s*([^<]+)/gi,
    '<div class="definition-item"><span class="definition-term">$1</span><span class="definition-value">$2</span></div>'
  );

  // Wrap consecutive definition items in a container
  content = content.replace(
    /(<div class="definition-item">[\s\S]*?<\/div>\s*)+/g,
    '<div class="definition-list">$&</div>'
  );

  // Style bullet points with bold terms (e.g., "Kibo – Description")
  content = content.replace(
    /<strong>([^<]+)<\/strong>\s*[–—-]\s*([^<]+)/gi,
    '<strong class="term-highlight">$1</strong> <span class="term-description">– $2</span>'
  );

  // Add section dividers before h3 numbered headings (except the first one)
  let h3Count = 0;
  content = content.replace(/<h3 class="numbered-heading"/g, (match) => {
    h3Count++;
    if (h3Count > 1) {
      return '<div class="section-divider"></div><h3 class="numbered-heading"';
    }
    return match;
  });

  // Wrap standalone images in figure tags with captions (if not already wrapped)
  content = content.replace(
    /(?<!<figure[^>]*>)\s*<img([^>]+)alt="([^"]*)"([^>]*)>(?!\s*<\/figure>)/gi,
    '<figure class="content-figure"><img$1alt="$2"$3><figcaption>$2</figcaption></figure>'
  );

  // Convert FAQ sections to accordion format
  // Find FAQ heading and extract Q&A pairs that follow it
  const faqHeadingMatch = content.match(/<h3[^>]*>([^<]*(?:FAQ|Frequently Asked)[^<]*)<\/h3>/i);

  if (faqHeadingMatch) {
    const faqHeadingFull = faqHeadingMatch[0];
    const faqHeadingIndex = content.indexOf(faqHeadingFull);
    const afterFaq = content.substring(faqHeadingIndex + faqHeadingFull.length);

    // Find the end of FAQ section (next h2, h3, or end of content)
    const nextHeadingMatch = afterFaq.match(/<h[23][^>]*>/i);
    const faqContent = nextHeadingMatch
      ? afterFaq.substring(0, afterFaq.indexOf(nextHeadingMatch[0]))
      : afterFaq;

    // Extract Q&A pairs
    const qaPairs: Array<{question: string, answer: string}> = [];
    // Handle extra spaces in tags like <p > and <strong >
    const pattern = /<p\s*[^>]*>\s*<strong\s*[^>]*>([^<]+\??)<\/strong>\s*<br\s*\/?>\s*([^<]+)/gi;
    let qaMatch;

    while ((qaMatch = pattern.exec(faqContent)) !== null) {
      const question = qaMatch[1].trim();
      const answer = qaMatch[2].trim();
      if (question.length > 10 && answer.length > 5) {
        qaPairs.push({ question, answer });
      }
    }

    if (qaPairs.length > 0) {
      // Build accordion HTML
      let accordionHtml = faqHeadingFull + '\n<div class="faq-container mt-6">\n';

      qaPairs.forEach((qa, index) => {
        const isFirst = index === 0;
        accordionHtml += `
  <div class="faq-item border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm mb-3">
    <button class="faq-button w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors" aria-expanded="${isFirst}">
      <span class="font-semibold text-stone-800 pr-4">${decodeHtmlEntities(qa.question)}</span>
      <svg class="faq-icon w-5 h-5 text-emerald-600 flex-shrink-0 transition-transform duration-200 ${isFirst ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    <div class="faq-content overflow-hidden transition-all duration-200 ${isFirst ? 'max-h-96' : 'max-h-0'}">
      <div class="p-5 pt-0 text-stone-600 leading-relaxed border-t border-stone-100">
        ${decodeHtmlEntities(qa.answer)}
      </div>
    </div>
  </div>`;
      });

      accordionHtml += '\n</div>';

      // Replace the FAQ section with accordion
      const originalFaqSection = faqHeadingFull + faqContent;
      const remainingContent = nextHeadingMatch ? afterFaq.substring(afterFaq.indexOf(nextHeadingMatch[0])) : '';
      content = content.substring(0, faqHeadingIndex) + accordionHtml + remainingContent;
    }
  }

  // Clean up empty paragraphs
  content = content.replace(/<p>\s*<\/p>/gi, '');
  content = content.replace(/<p>&nbsp;<\/p>/gi, '');

  return content;
}

/**
 * Generate table of contents from content
 * Extracts h3 headings (both numbered and non-numbered)
 */
export function generateTableOfContents(html: string): Array<{ id: string; text: string; number?: string }> {
  const toc: Array<{ id: string; text: string; number?: string }> = [];

  // Match h3 tags with numbered-heading class (processed headings)
  const numberedRegex = /<h3[^>]*class="numbered-heading"[^>]*id="([^"]*)"[^>]*><span class="heading-number">(\d+)<\/span>([^<]+)<\/h3>/gi;
  let match;

  while ((match = numberedRegex.exec(html)) !== null) {
    toc.push({
      id: match[1],
      number: match[2],
      text: decodeHtmlEntities(match[3].trim())
    });
  }

  // Also match regular h3 tags with IDs (non-numbered)
  const regularRegex = /<h3[^>]*id="([^"]*)"[^>]*>([^<]+)<\/h3>/gi;

  while ((match = regularRegex.exec(html)) !== null) {
    // Skip if it's a numbered heading (already captured above)
    if (!match[0].includes('numbered-heading')) {
      toc.push({
        id: match[1],
        text: decodeHtmlEntities(match[2].trim())
      });
    }
  }

  return toc;
}
