import DOMPurify from "isomorphic-dompurify";

const VOID_TAGS = new Set([
  "IMG",
  "IFRAME",
  "VIDEO",
  "SVG",
  "BR",
  "HR",
  "SOURCE",
]);

DOMPurify.addHook("afterSanitizeElements", (node) => {
  if (node.nodeType !== 1) return;

  const el = node as HTMLElement;

  if (VOID_TAGS.has(el.tagName)) return;

  const hasText = el.textContent?.trim().length;
  const hasChildren = el.children.length > 0;

  if (!hasText && !hasChildren) {
    el.parentNode?.removeChild(el);
  }
});

export function sanitizeHtml(dirtyHtml: string): string {
  return DOMPurify.sanitize(dirtyHtml);
}