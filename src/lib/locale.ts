const supportedLocales = new Set(["en", "fr", "ko", "it"]);

export function normalizeLocale(value: unknown) {
  const raw = Array.isArray(value) ? value[0] : value;

  if (typeof raw !== "string" || !raw) {
    return "en";
  }

  const base = raw.toLowerCase().split("-")[0];
  return supportedLocales.has(base) ? base : "en";
}
