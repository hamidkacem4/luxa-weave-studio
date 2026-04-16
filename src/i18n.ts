import { createInstance, type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../public/locales/en/translation.json";
import frTranslation from "../public/locales/fr/translation.json";
import koTranslation from "../public/locales/ko/translation.json";
import itTranslation from "../public/locales/it/translation.json";
import { normalizeLocale } from "@/lib/locale";

const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  ko: { translation: koTranslation },
  it: { translation: itTranslation },
};

function setupI18n(instance: I18nInstance, locale = "en") {
  void instance.use(initReactI18next).init({
    resources,
    lng: normalizeLocale(locale),
    supportedLngs: ["en", "fr", "ko", "it"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    initImmediate: false,
  });

  return instance;
}

export function createI18nInstance(locale: string) {
  return setupI18n(createInstance(), locale);
}

const i18n = createI18nInstance("en");

export default i18n;
