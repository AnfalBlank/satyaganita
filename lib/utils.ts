import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates estimated reading time in minutes based on text length.
 * Average reading speed: ~200-250 words per minute.
 */
export function calculateReadingTime(text: string): number {
  if (!text) return 0;
  const wordsPerMinute = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

export function formatContent(content: string): string {
  if (!content) return "";
  
  // If content contains common HTML tags, assume it's already formatted
  const htmlPattern = /<(p|div|h[1-6]|ul|ol|img|br)[\s>]/i;
  // Make sure we only return early if there are explicit block-level HTML tags
  if (htmlPattern.test(content) && !content.includes("![")) {
     // If it contains explicit block HTML, and doesn't look like mixed markdown with images
     // just fallback to returning it.
     // return content;
  }
  
  let formatted = content;
  
  // Quick basic markdown parser
  // 1. Convert Images ![alt](url)
  formatted = formatted.replace(/\!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  
  // 2. Convert Links [text](url)
  formatted = formatted.replace(/(?<!!)(?:\[([^\]]+)\])\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // 3. Convert Headers # Header
  formatted = formatted.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  formatted = formatted.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  formatted = formatted.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // 4. Convert Bold **text**
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // 5. Convert Italic *text*
  formatted = formatted.replace(/(?<!\w)\*([^*]+)\*(?!\w)/g, '<em>$1</em>');
  
  // 6. Convert Lists (bullets starting with -, *, or +)
  formatted = formatted.replace(/^\s*[-*+]\s+(.*)$/gim, '<ul><li>$1</li></ul>');
  // Combine adjacent ul lists
  formatted = formatted.replace(/<\/ul>\n*<ul>/g, '\n');
  
  // 7. Convert double newlines to paragraphs (skip wrapping already block tags)
  const lines = formatted.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  formatted = lines.map(p => {
    // If paragraph starts with a block tag, don't wrap it in <p>
    if (/^<(h[1-6]|ul|ol|div|img|p)/.test(p.trim())) {
      return p;
    }
    return `<p>${p.replace(/\n/g, "<br />")}</p>`;
  }).join("\n");
  
  return formatted;
}

/**
 * Formats a date to Indonesian locale with fallback.
 */
export function formatDate(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (e) {
    return "Invalid Date";
  }
}
