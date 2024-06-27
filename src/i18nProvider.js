import { resolveBrowserLocale } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import en from './i18n/en';
import ru from './i18n/ru';

const translations = { en, ru },
    defaultLocale = 'en';

export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale] ? translations[locale] : translations.defaultLocale,
    resolveBrowserLocale(defaultLocale, { fullLocales: true }),
    [
        { locale: 'en', name: 'English' },
        { locale: 'ru', name: 'Русский' }
    ],
);