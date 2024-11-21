import { AuthUser } from '../auth.types';

export const createMockAuthUser = (
    overwriteValues: Partial<AuthUser> = {}
): AuthUser => ({
    id: '1',
    isAdmin: true,
    email: 'test@email.com',
    username: 'Test',
    ...overwriteValues
});
