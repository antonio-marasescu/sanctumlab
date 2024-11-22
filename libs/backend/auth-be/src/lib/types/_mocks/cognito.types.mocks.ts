import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';
import { CognitoConfig } from '../cognito.types';

export const createMockCognitoIdToken = (
    overwriteValues: Partial<CognitoIdTokenPayload> = {}
): CognitoIdTokenPayload => ({
    sub: 'mockSub',
    aud: 'mockAud',
    iss: 'mockIssuer',
    exp: 1234567890,
    iat: 1234567890,
    token_use: 'id',
    auth_time: 1234567890,
    jti: '1234567890',
    origin_jti: '1234567890',
    at_hash: 'mockAtHash',
    'cognito:username': 'mockUsername',
    email_verified: true,
    phone_number_verified: false,
    identities: [
        {
            userId: 'mockUserId',
            providerName: 'mockProviderName',
            providerType: 'mockProviderType',
            issuer: null,
            primary: 'true',
            dateCreated: '2023-01-01T00:00:00Z'
        }
    ],
    'cognito:roles': ['mockRole1', 'mockRole2'],
    'cognito:preferred_role': 'mockPreferredRole',
    ...overwriteValues
});

export const createMockCognitoConfig = (
    overwriteValues: Partial<CognitoConfig> = {}
): CognitoConfig => ({
    userPoolId: 'us-east-1_123456789',
    userPoolClientId: 'client_id_123456',
    ...overwriteValues
});
