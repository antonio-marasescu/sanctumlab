import {
    EnvironmentProviders,
    isDevMode,
    makeEnvironmentProviders,
    provideAppInitializer
} from '@angular/core';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {
    FALLBACK_LANGUAGE,
    SUPPORTED_LANGUAGES,
    TRANSLATION_NAMESPACES
} from '../types/i18n.types';
import i18next from 'i18next';
import { I18nTranslateService } from '../services/i18n-translate.service';

export const i18NextFactory = async () => {
    return i18next
        .use(LanguageDetector)
        .use(HttpApi)
        .init({
            supportedLngs: [
                ...SUPPORTED_LANGUAGES.map(language => language.id)
            ],
            fallbackLng: FALLBACK_LANGUAGE,
            debug: isDevMode(),
            returnEmptyString: false,
            ns: [...TRANSLATION_NAMESPACES],
            backend: {
                loadPath: 'locales/{{lng}}.{{ns}}.json'
            }
        });
};

export const provideInternationalization = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideAppInitializer(async () => await i18NextFactory()),
        I18nTranslateService
    ]);
