import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import arTranslations from './locales/ar.json'
import enTranslations from './locales/en.json'
import frTranslations from './locales/fr.json'

const resources = {
  fr: { translation: frTranslations },
  en: { translation: enTranslations },
  ar: { translation: arTranslations }
}

const savedLanguage = localStorage.getItem('language') || 'fr'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
