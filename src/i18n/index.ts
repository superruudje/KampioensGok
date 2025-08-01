import { createI18n } from 'vue-i18n'
import en from './en.json'
import nl from './nl.json'

const browserLang = navigator.language.slice(0, 2) // e.g., 'en', 'nl'
const supportedLangs = ['en', 'nl']

const savedLocale =
    localStorage.getItem('lang') ||
    (supportedLangs.includes(browserLang) ? browserLang : 'nl')

export const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    warnHtmlMessage: false,
    messages: {
        en,
        nl
    }
})