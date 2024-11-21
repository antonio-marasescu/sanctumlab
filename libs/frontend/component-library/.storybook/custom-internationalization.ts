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
                        supportedLngs: ['en'],
                        fallbackLng: 'en',
                        debug: isDevMode(),
                        returnEmptyString: false,
                        ns: [],
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
