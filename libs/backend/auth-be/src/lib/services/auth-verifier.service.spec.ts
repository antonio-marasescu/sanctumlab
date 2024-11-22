import { mock } from 'jest-mock-extended';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { AuthVerifierService } from './auth-verifier.service';
import {
    createMockCognitoConfig,
    createMockCognitoIdToken
} from '../types/_mocks/cognito.types.mocks';

jest.mock('aws-jwt-verify');
describe('AuthVerifierService', () => {
    const authConfig = createMockCognitoConfig();

    let verifierMock = mock<CognitoJwtVerifier<never, never, never>>();

    beforeEach(() => {
        jest.clearAllMocks();
        verifierMock = mock<CognitoJwtVerifier<never, never, never>>();
        (CognitoJwtVerifier.create as jest.Mock).mockReturnValue(verifierMock);
    });

    it('should setup the cognito verifier with the correct parameters', () => {
        const service = new AuthVerifierService();

        service.setup(authConfig);

        expect(CognitoJwtVerifier.create).toHaveBeenCalledWith({
            userPoolId: authConfig.userPoolId,
            tokenUse: 'id',
            clientId: authConfig.userPoolClientId
        });
    });

    it('should authorize a token successfully', async () => {
        const service = new AuthVerifierService();
        service.setup(authConfig);

        const token = 'someValidToken';
        const mockPayload = createMockCognitoIdToken();
        verifierMock.verify.mockResolvedValue(mockPayload);

        const result = await service.authorize(token);

        expect(verifierMock.verify).toHaveBeenCalledWith(token);
        expect(result).toEqual(mockPayload);
    });

    it('should throw an error if the verification fails', async () => {
        const service = new AuthVerifierService();
        service.setup(authConfig);

        const token = 'invalidToken';
        verifierMock.verify.mockRejectedValue(new Error('Invalid token'));

        await expect(service.authorize(token)).rejects.toThrow('Invalid token');
    });
});
