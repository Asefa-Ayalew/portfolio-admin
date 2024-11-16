// i18n.ts (or i18n.js if you're not using TypeScript)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../translations/en.json';  // Make sure you have these locales
import am from '../../../translations/am.json';  // Make sure you have these locales

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
    },
    lng: 'en',  // Default language
    fallbackLng: 'en',  // Fallback language if the desired language isn't available
    interpolation: {
      escapeValue: false,  // React already escapes values
    },
  });

export default i18n;
