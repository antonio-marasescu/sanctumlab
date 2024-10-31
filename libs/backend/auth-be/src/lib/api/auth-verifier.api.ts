import { CognitoConfig } from '../types/cognito.types';
import { AuthVerifierServiceInstance } from '../services/auth-verifier.service';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';

export class AuthVerifierApi {
    public async authorize(
        token: string,
        authConfig: CognitoConfig
    ): Promise<CognitoIdTokenPayload | undefined> {
        try {
            AuthVerifierServiceInstance.setup(authConfig);
            return AuthVerifierServiceInstance.authorize(token);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}

export const AuthVerifierApiInstance = new AuthVerifierApi();
