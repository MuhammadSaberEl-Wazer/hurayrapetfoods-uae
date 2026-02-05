import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const STORAGE_KEY = 'hurayra-locale';

// Paths relative to src/ so locales load from src/locales/
const enModules = import.meta.glob<{ default: Record<string, unknown> }>(
  './locales/en/*.json',
  { eager: true }
);
const arModules = import.meta.glob<{ default: Record<string, unknown> }>(
  './locales/ar/*.json',
  { eager: true }
);

function toNamespaced(modules: Record<string, { default?: Record<string, unknown> }>) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, mod]) => {
      const match = path.match(/(?:en|ar)\/(.+)\.json$/);
      const name = match ? match[1] : path.replace(/^.*\/(.+)\.json$/, '$1');
      return [name, mod?.default ?? {}];
    })
  );
}

const resources = {
  en: toNamespaced(enModules),
  ar: toNamespaced(arModules),
};

const savedLocale = (() => {
  try {
    const l = localStorage.getItem(STORAGE_KEY);
    if (l === 'en' || l === 'ar') return l;
  } catch {
    // ignore
  }
  return undefined;
})();

i18n.use(initReactI18next).init({
  resources,
  lng: savedLocale ?? 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ar'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  } catch {
    // ignore
  }
});

document.documentElement.lang = i18n.language;
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

export default i18n;
export { STORAGE_KEY };
