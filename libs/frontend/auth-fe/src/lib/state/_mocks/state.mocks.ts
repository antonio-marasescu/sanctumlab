import {
    authInitialState,
    AuthState,
    AuthStateFeatureName
} from '../auth.reducers';

export const createMockAuthInitialState = (
    overwriteValues: Partial<{
        auth: AuthState;
    }> = {}
) => ({
    [AuthStateFeatureName]: authInitialState,
    ...overwriteValues
});
