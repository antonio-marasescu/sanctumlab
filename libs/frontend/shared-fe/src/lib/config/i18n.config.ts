import {
    I18NEXT_SERVICE,
    I18NextModule,
    ITranslationService
} from 'angular-i18next';
import {
    APP_INITIALIZER,
    EnvironmentProviders,
    importProvidersFrom,
    isDevMode,
    LOCALE_ID,
    makeEnvironmentProviders
} from '@angular/core';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {
    FALLBACK_LANGUAGE,
    SUPPORTED_LANGUAGES,
    TRANSLATION_NAMESPACES
} from '../types/i18n.types';

export const provideInternationalization = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        importProvidersFrom(I18NextModule.forRoot()),
        {
            provide: APP_INITIALIZER,
            useFactory: (i18next: ITranslationService) => () =>
                i18next
                    .use(HttpApi)
                    .use(LanguageDetector)
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
                    }),
            deps: [I18NEXT_SERVICE],

            multi: true
        },
        {
            provide: LOCALE_ID,
            deps: [I18NEXT_SERVICE],
            useFactory: (i18next: ITranslationService) => i18next.language
        }
    ]);
