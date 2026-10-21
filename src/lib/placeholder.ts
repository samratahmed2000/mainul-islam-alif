const PLACEHOLDER_PATTERNS: readonly RegExp[] = [
  /^add\b/i,
  /^edit\b/i,
  /placeholder/i,
  /^author name$/i,
];

/**
 * Template copy in `db.json` starts with an instruction such as "Add ..." or
 * "Edit ...". Keep it out of rendered biography and media sections until the
 * owner replaces it with verified content.
 */
export function isPlaceholderText(value: string): boolean {
  const text = value.trim();
  return text.length === 0 || PLACEHOLDER_PATTERNS.some((p) => p.test(text));
}
