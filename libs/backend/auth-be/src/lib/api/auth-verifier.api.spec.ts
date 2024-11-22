import { mock } from 'jest-mock-extended';
import { AuthVerifierService } from '../services/auth-verifier.service';
import { AuthVerifierApi } from './auth-verifier.api';
import {
    createMockCognitoConfig,
    createMockCognitoIdToken
} from '../types/_mocks/cognito.types.mocks';

describe('AuthVerifierApi', () => {
    let mockAuthVerifierService = mock<AuthVerifierService>();
    let authVerifierApi: AuthVerifierApi;

    beforeEach(() => {
        mockAuthVerifierService = mock<AuthVerifierService>();
        authVerifierApi = new AuthVerifierApi(mockAuthVerifierService);
    });

    it('should call setup and authorize methods of AuthVerifierService with correct parameters', async () => {
        const token = 'mockToken';
        const authConfig = createMockCognitoConfig();
        const mockPayload = createMockCognitoIdToken();

        mockAuthVerifierService.authorize.mockResolvedValue(mockPayload);

        const result = await authVerifierApi.authorize(token, authConfig);

        expect(mockAuthVerifierService.setup).toHaveBeenCalledWith(authConfig);
        expect(mockAuthVerifierService.authorize).toHaveBeenCalledWith(token);
        expect(result).toEqual(mockPayload);
    });
});
