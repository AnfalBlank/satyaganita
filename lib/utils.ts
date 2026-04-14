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

/**
 * Converts plain text into clean HTML paragraphs.
 * If the content already contains HTML tags, it returns as is.
 */
export function formatContent(content: string): string {
  if (!content) return "";
  
  // If content contains common HTML tags, assume it's already formatted
  const htmlPattern = /<[a-z][\s\S]*>/i;
  if (htmlPattern.test(content)) {
    return content;
  }
  
  // Convert double newlines to paragraphs
  const paragraphs = content
    .split(/\n\s*\n/)
    .filter(p => p.trim().length > 0)
    .map(p => `<p>${p.replace(/\n/g, "<br />")}</p>`)
    .join("");
    
  return paragraphs;
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
