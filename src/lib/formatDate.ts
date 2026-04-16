import { normalizeLocale } from "@/lib/locale";

type DateFormatStyle = "long" | "short";

const localeMap = {
  en: "en-US",
  fr: "fr-FR",
  ko: "ko-KR",
  it: "it-IT",
} as const;

function toUtcDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return new Date(date);
  }

  return new Date(Date.UTC(year, month - 1, day));
}

export function formatDate(date: string, locale: string, style: DateFormatStyle = "long") {
  const safeLocale = normalizeLocale(locale);
  const formatter = new Intl.DateTimeFormat(localeMap[safeLocale], {
    year: "numeric",
    month: style === "short" ? "short" : "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return formatter.format(toUtcDate(date));
}
