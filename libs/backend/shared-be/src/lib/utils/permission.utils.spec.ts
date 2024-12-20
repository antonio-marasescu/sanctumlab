import { UserRole, VerifiedTokenContext } from '@sanctumlab/be/auth';
import { RequiresRole } from './permission.utils';
import { NotAuthorizedException } from '../types/exception.types';

describe('permissionUtils', () => {
    describe('RequiresRole', () => {
        const mockMethod = jest.fn();

        class TestClass {
            @RequiresRole(UserRole.ADMIN)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            testMethod(ctx: VerifiedTokenContext): string {
                mockMethod();
                return 'Success';
            }
        }

        let testInstance: TestClass;

        beforeEach(() => {
            jest.clearAllMocks();
            testInstance = new TestClass();
        });

        it('should execute the method if user has the required role', async () => {
            const ctx: VerifiedTokenContext = {
                email: 'test@example.com',
                tokenType: 'Bearer',
                sub: '123',
                roles: 'admin',
                name: 'Test User'
            };

            const result = await testInstance.testMethod(ctx);

            expect(result).toBe('Success');
            expect(mockMethod).toHaveBeenCalledTimes(1);
        });

        it('should throw NotAuthorizedException if user does not have the required role', async () => {
            const ctx: VerifiedTokenContext = {
                email: 'test@example.com',
                tokenType: 'Bearer',
                sub: '123',
                roles: 'user', // Does not match the required 'admin' role
                name: 'Test User'
            };

            await expect(testInstance.testMethod(ctx)).rejects.toThrow(
                NotAuthorizedException
            );
            expect(mockMethod).not.toHaveBeenCalled();
        });

        it('should throw an error if no VerifiedTokenContext is passed', async () => {
            const invalidCtx = {}; // Invalid context

            await expect(
                testInstance.testMethod(invalidCtx as VerifiedTokenContext)
            ).rejects.toThrow(
                'No VerifiedTokenContext found as argument for this method.'
            );
            expect(mockMethod).not.toHaveBeenCalled();
        });
    });
});
