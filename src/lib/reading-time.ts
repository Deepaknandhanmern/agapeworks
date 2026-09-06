// 200 wpm is the usual middle-of-the-road estimate for adult prose reading.
// Markdown syntax (fences, link targets, image markup) is stripped first so a
// post heavy on code samples doesn't report a wildly inflated word count.
const WORDS_PER_MINUTE = 200;

export function readingMinutes(markdown: string): number {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]/g, " ");

  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
