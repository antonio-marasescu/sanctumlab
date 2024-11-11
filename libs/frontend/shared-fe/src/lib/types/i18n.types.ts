export type SupportedLanguage = {
    id: string;
    label: string;
};

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
    {
        id: 'en',
        label: 'English'
    },
    {
        id: 'ro',
        label: 'Romanian'
    }
];

export const TRANSLATION_NAMESPACES = [
    'app',
    'auth',
    'shared',
    'menu',
    'notification',
    'profile'
];

export const FALLBACK_LANGUAGE = 'en';
