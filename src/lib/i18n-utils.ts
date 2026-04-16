import enMessages from "../../public/locales/en/translation.json";
import frMessages from "../../public/locales/fr/translation.json";
import koMessages from "../../public/locales/ko/translation.json";
import itMessages from "../../public/locales/it/translation.json";
import { normalizeLocale } from "@/lib/locale";

const localeMessages = {
  en: enMessages,
  fr: frMessages,
  ko: koMessages,
  it: itMessages,
} as const;

export type AppLocale = keyof typeof localeMessages;

function getNestedValue(source: unknown, path: string) {
  return path.split(".").reduce<unknown>((value, segment) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    if (Array.isArray(value)) {
      const index = Number(segment);
      return Number.isInteger(index) ? value[index] : undefined;
    }

    if (typeof value === "object") {
      return (value as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

export function getMessages(locale?: string) {
  const safeLocale = normalizeLocale(locale) as AppLocale;
  return localeMessages[safeLocale];
}

export function t(locale: string | undefined, key: string, fallback = "") {
  const value = getNestedValue(getMessages(locale), key);
  return typeof value === "string" ? value : fallback;
}

export function getTranslationValue<T = unknown>(locale: string | undefined, key: string): T | undefined;
export function getTranslationValue<T>(locale: string | undefined, key: string, fallback: T): T;
export function getTranslationValue<T>(locale: string | undefined, key: string, fallback?: T) {
  const value = getNestedValue(getMessages(locale), key);
  return value === undefined ? fallback : (value as T);
}
