import {
    EnvironmentProviders,
    isDevMode,
    makeEnvironmentProviders,
    provideAppInitializer
} from '@angular/core';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import i18next from 'i18next';

const i18NextFactoryStorybook = async () => {
    return i18next
        .use(LanguageDetector)
        .use(HttpApi)
        .init({
            supportedLngs: ['en'],
            fallbackLng: 'en',
            debug: isDevMode(),
            returnEmptyString: false,
            ns: [],
            backend: {
                loadPath: 'locales/{{lng}}.{{ns}}.json'
            }
        });
};

export const provideInternationalizationStorybook = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideAppInitializer(async () => await i18NextFactoryStorybook())
    ]);
