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
    matWarning
} from '@ng-icons/material-icons/baseline';
import { environment } from '../environments/environment';
import {
    provideApiEndpointConfiguration,
    provideDataAccessState
} from '@sanctumlab/fe/data-access';
import { provideHttpClient } from '@angular/common/http';
import {
    provideAuthConfiguration,
    provideAuthentication,
    provideAuthState
} from '@sanctumlab/fe/auth';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { provideInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { provideQuillConfig } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideEffects(),
        provideStore(),
        provideStoreDevtools({ maxAge: 50, logOnly: !isDevMode() }),
        provideIcons({
            matFastfood,
            matLocalBar,
            matMenu,
            matClose,
            matDelete,
            matPlus,
            matWarning
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
        provideInputValidationConfiguration({
            errors: {
                required: () => 'This field is required',
                minlength: ({ requiredLength }: { requiredLength: number }) =>
                    `The required length is ${requiredLength}`,
                email: () => `Invalid email address format`
            }
        }),
        provideZoneChangeDetection({ eventCoalescing: true }),
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
        })
    ]
};
