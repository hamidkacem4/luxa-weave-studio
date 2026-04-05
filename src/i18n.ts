import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Directly import translation files to ensure server-side availability for SSR/SEO
import enTranslation from '../public/locales/en/translation.json';
import frTranslation from '../public/locales/fr/translation.json';
import koTranslation from '../public/locales/ko/translation.json';

const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  ko: { translation: koTranslation }
};

// initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['en', 'fr', 'ko'],
    fallbackLng: 'en',
    react: {
      useSuspense: false,
    },
  });

export default i18n;