import { UserRole, VerifiedTokenContext } from '@sanctumlab/be/auth';
import { hasRoleOrThrow } from './permission.utils';
import { NotAuthorizedException } from '../types/exception.types';

describe('permissionUtils', () => {
    describe('hasRoleOrThrow', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should not throw an exception if user has the required role', () => {
            const ctx: VerifiedTokenContext = {
                email: 'test@example.com',
                tokenType: 'Bearer',
                sub: '123',
                roles: 'admin',
                name: 'Test User'
            };

            expect(() => hasRoleOrThrow(ctx, UserRole.ADMIN)).not.toThrow();
        });

        it('should throw NotAuthorizedException if user does not have the required role', () => {
            const ctx: VerifiedTokenContext = {
                email: 'test@example.com',
                tokenType: 'Bearer',
                sub: '123',
                roles: undefined,
                name: 'Test User'
            };

            expect(() => hasRoleOrThrow(ctx, UserRole.ADMIN)).toThrow(
                NotAuthorizedException
            );
        });
    });
});
