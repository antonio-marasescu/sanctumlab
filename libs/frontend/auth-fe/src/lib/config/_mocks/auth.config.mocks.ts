import { provideAuthConfiguration } from '../auth-settings.config';

export const provideMockAuthConfiguration = () =>
    provideAuthConfiguration({
        cognitoGuestUsername: 'test',
        cognitoRedirectUrlSignIn: 'localhost',
        cognitoRedirectUrlSignOut: 'localhost',
        cognitoDomain: 'test-domain',
        cognitoUserPoolClientId: 'test-client-id',
        cognitoUserPoolId: 'test-user-pool-id'
    });
