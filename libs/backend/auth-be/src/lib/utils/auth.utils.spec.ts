import { createMockVerifiedContext } from '../types/_mocks/cognito.types.mocks';
import { extractRoles, hasRole } from './auth.utils';
import { UserRole } from '../types/cognito.types';

describe('authUtils', () => {
    describe('extractRoles', () => {
        it('should return an empty array if roles are undefined', () => {
            const context = createMockVerifiedContext({ roles: undefined });
            const result = extractRoles(context);
            expect(result).toEqual([]);
        });

        it('should return an array of roles if roles are defined as a comma-separated string', () => {
            const context = createMockVerifiedContext({ roles: 'admin,user' });
            const result = extractRoles(context);
            expect(result).toEqual(['admin', 'user']);
        });

        it('should return an empty array if roles are an empty string', () => {
            const context = createMockVerifiedContext({ roles: '' });
            const result = extractRoles(context);
            expect(result).toEqual([]);
        });
    });

    describe('hasRole', () => {
        it('should return true if the user has the specified role', () => {
            const context = createMockVerifiedContext({ roles: 'admin,user' });
            const result = hasRole(context, UserRole.ADMIN);
            expect(result).toBe(true);
        });

        it('should return false if the user does not have the specified role', () => {
            const context = createMockVerifiedContext({ roles: 'user,editor' });
            const result = hasRole(context, UserRole.ADMIN);
            expect(result).toBe(false);
        });

        it('should return false if roles are undefined', () => {
            const context = createMockVerifiedContext({ roles: undefined });
            const result = hasRole(context, UserRole.ADMIN);
            expect(result).toBe(false);
        });

        it('should return false if roles are an empty string', () => {
            const context = createMockVerifiedContext({ roles: '' });
            const result = hasRole(context, UserRole.ADMIN);
            expect(result).toBe(false);
        });
    });
});
