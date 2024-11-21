import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';
import { CognitoConfig } from '../types/cognito.types';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';

export class AuthVerifierService {
    private cognitoVerifier!: CognitoJwtVerifierSingleUserPool<{
        userPoolId: string;
        tokenUse: 'id';
        clientId: string;
    }>;

    public setup(authConfig: CognitoConfig): void {
        this.cognitoVerifier = CognitoJwtVerifier.create({
            userPoolId: authConfig.userPoolId,
            tokenUse: 'id',
            clientId: authConfig.userPoolClientId
        });
    }

    public async authorize(token: string): Promise<CognitoIdTokenPayload> {
        return this.cognitoVerifier.verify(token);
    }
}

export const AuthVerifierServiceInstance = new AuthVerifierService();
