import {
    EnvironmentProviders,
    InjectionToken,
    makeEnvironmentProviders
} from '@angular/core';

export interface AuthConfiguration {
    cognitoGuestUsername: string;
    cognitoRedirectUrlSignIn: string;
    cognitoRedirectUrlSignOut: string;
    cognitoDomain: string;
    cognitoUserPoolClientId: string;
    cognitoUserPoolId: string;
}

export const AUTH_CONFIG = new InjectionToken<AuthConfiguration>('AUTH_CONFIG');

export const provideAuthConfiguration = (
    configuration: AuthConfiguration
): EnvironmentProviders =>
    makeEnvironmentProviders([
        {
            provide: AUTH_CONFIG,
            useValue: configuration
        }
    ]);
