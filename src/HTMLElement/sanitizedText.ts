import DOMPurify from "dompurify";

export const sanitizedText = (text: string): string => DOMPurify.sanitize(text);
