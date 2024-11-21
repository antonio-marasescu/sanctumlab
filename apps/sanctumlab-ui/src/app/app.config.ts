import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
    provideZoneChangeDetection
} from '@angular/core';
import {
    provideRouter,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideIcons } from '@ng-icons/core';
import {
    matClose,
    matDelete,
    matFastfood,
    matLocalBar,
    matMenu,
    matPlus,
    matQrCode,
    matWarning
} from '@ng-icons/material-icons/baseline';
import { environment } from '../environments/environment';
import {
    provideApiEndpointConfiguration,
    provideDataAccessState
} from '@sanctumlab/fe/data-access';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    authInterceptor,
    provideAuthConfiguration,
    provideAuthentication,
    provideAuthState
} from '@sanctumlab/fe/auth';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { provideInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { provideQuillConfig } from 'ngx-quill';
import {
    provideInternationalization,
    validationConfigFactory
} from '@sanctumlab/fe/shared';

export const appConfig: ApplicationConfig = {
    providers: [
        provideEffects(),
        provideStore(),
        provideStoreDevtools({ maxAge: 50, logOnly: !isDevMode() }),
        provideInternationalization(),
        provideIcons({
            matFastfood,
            matLocalBar,
            matMenu,
            matClose,
            matDelete,
            matPlus,
            matWarning,
            matQrCode
        }),
        provideAuthConfiguration({
            cognitoGuestUsername: environment.cognitoGuestUsername,
            cognitoRedirectUrlSignIn: environment.cognitoRedirectUrlSignIn,
            cognitoRedirectUrlSignOut: environment.cognitoRedirectUrlSignOut,
            cognitoDomain: environment.cognitoDomain,
            cognitoUserPoolId: environment.cognitoUserPoolId,
            cognitoUserPoolClientId: environment.cognitoUserPoolClientId
        }),
        provideApiEndpointConfiguration({
            address: environment.apiUrl
        }),
        importProvidersFrom(AmplifyAuthenticatorModule),
        provideAuthentication(),
        provideAuthState(),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideInputValidationConfiguration(validationConfigFactory()),
        provideDataAccessState(),
        provideRouter(
            appRoutes,
            withEnabledBlockingInitialNavigation(),
            withComponentInputBinding()
        ),
        provideQuillConfig({
            theme: 'snow',
            modules: {
                syntax: false,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote'],
                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                    [{ align: [] }],
                    ['clean']
                ]
            }
        }),
        provideZoneChangeDetection({ eventCoalescing: true })
    ]
};
