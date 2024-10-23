import { Inject, Injectable } from '@angular/core';
import { AUTH_CONFIG, AuthConfiguration } from '../config/auth-settings.config';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import {
    cognitoUserPoolsTokenProvider,
    getCurrentUser
} from 'aws-amplify/auth/cognito';
import { signIn, signOut, fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { Router } from '@angular/router';
import { AuthFeatureName, AuthRoutes } from '../types/auth-navigation.types';
import { BehaviorSubject } from 'rxjs';
import { AuthUser } from '../types/auth.types';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.reducers';
import { AuthActions } from '../state/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(
        @Inject(AUTH_CONFIG) private authConfiguration: AuthConfiguration,
        private router: Router,
        private store: Store<AuthState>
    ) {}

    public async init(): Promise<void> {
        this.applyAuthConfig();
        Hub.listen('auth', async ({ payload }) => {
            switch (payload.event) {
                case 'signedIn': {
                    await this.updateAuthState();
                    await this.router.navigate(['/']);
                    break;
                }
                case 'signedOut': {
                    this.store.dispatch(AuthActions.logout());
                    await this.router.navigate([
                        AuthFeatureName,
                        AuthRoutes.LOGIN
                    ]);
                    break;
                }
                case 'tokenRefresh_failure': {
                    await this.signOut();
                    break;
                }
            }
        });
        await this.updateAuthState();
    }

    public async isAuthenticated(): Promise<boolean> {
        return getCurrentUser()
            .then(() => true)
            .catch(() => false);
    }

    public async loginAsGuest(accessCode: string): Promise<boolean> {
        return this.login(
            this.authConfiguration.cognitoGuestUsername,
            accessCode
        );
    }

    public async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await signIn({
                username: this.authConfiguration.cognitoGuestUsername,
                password: password
            });

            if (response.nextStep.signInStep === 'DONE') {
                return true;
            }

            return response.isSignedIn;
        } catch (error) {
            return false;
        }
    }

    public async signOut(): Promise<void> {
        await signOut();
    }

    private async updateAuthState(): Promise<void> {
        const isLoggedIn = await this.isAuthenticated();
        if (!isLoggedIn) {
            return;
        }

        const currentUser = await this.getCurrentUser();
        this.store.dispatch(AuthActions.loginSuccess({ user: currentUser }));
    }

    private async getCurrentUser(): Promise<AuthUser> {
        const session = await fetchAuthSession();
        const currentUser = await getCurrentUser();

        const username =
            (session.tokens?.idToken?.payload?.['name'] as string) || '';
        const id = currentUser.userId;
        const email = currentUser.signInDetails?.loginId || '';

        return {
            id,
            email,
            username
        };
    }

    private applyAuthConfig(): void {
        const configuration: ResourcesConfig['Auth'] = {
            Cognito: {
                userPoolClientId:
                    this.authConfiguration.cognitoUserPoolClientId,
                userPoolId: this.authConfiguration.cognitoUserPoolId,
                loginWith: {
                    oauth: {
                        domain: this.authConfiguration.cognitoDomain,
                        scopes: [
                            'aws.cognito.signin.user.admin',
                            'email',
                            'openid',
                            'phone',
                            'profile'
                        ],
                        redirectSignIn: [
                            this.authConfiguration.cognitoRedirectUrlSignIn
                        ],
                        redirectSignOut: [
                            this.authConfiguration.cognitoRedirectUrlSignOut
                        ],
                        responseType: 'token'
                    },
                    email: true
                }
            }
        };

        cognitoUserPoolsTokenProvider.setAuthConfig(configuration);
        cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

        Amplify.configure(
            {
                Auth: configuration
            },
            { Auth: { tokenProvider: cognitoUserPoolsTokenProvider } }
        );
    }
}
