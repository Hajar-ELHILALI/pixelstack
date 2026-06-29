// Small SVG helpers shared by the renderers.

export const FONT =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

export function escapeXml(s) {
  return String(s).replace(
    /[<>&'"]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}

// Rough width of a monospace string, in px, for layout math.
export function textWidth(s, fontSize) {
  return String(s).length * fontSize * 0.62;
}
