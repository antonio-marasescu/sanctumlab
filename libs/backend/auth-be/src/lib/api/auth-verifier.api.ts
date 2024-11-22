import { CognitoConfig } from '../types/cognito.types';
import {
    AuthVerifierService,
    AuthVerifierServiceInstance
} from '../services/auth-verifier.service';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';

export class AuthVerifierApi {
    constructor(private readonly authVerifierService: AuthVerifierService) {}

    public async authorize(
        token: string,
        authConfig: CognitoConfig
    ): Promise<CognitoIdTokenPayload | undefined> {
        try {
            this.authVerifierService.setup(authConfig);
            return this.authVerifierService.authorize(token);
        } catch (error) {
            console.error('Error occured', JSON.stringify({ error }));
            return undefined;
        }
    }
}

export const AuthVerifierApiInstance = new AuthVerifierApi(
    AuthVerifierServiceInstance
);
