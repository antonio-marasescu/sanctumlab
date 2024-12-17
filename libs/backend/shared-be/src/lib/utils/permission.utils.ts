import {
    hasRole,
    UserRole,
    VerifiedTokenContext,
    VerifiedTokenContextSchema
} from '@sanctumlab/be/auth';
import { NotAuthorizedException } from '../types/exception.types';

export function RequiresRole(role: UserRole) {
    return function (
        target: unknown,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): void {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: unknown[]) {
            const ctx = args.find(
                arg =>
                    arg &&
                    typeof arg === 'object' &&
                    VerifiedTokenContextSchema.safeParse(arg).success
            ) as VerifiedTokenContext;

            if (!ctx) {
                throw new Error(
                    'No VerifiedTokenContext found as argument for this method.'
                );
            }

            const hasPermission = hasRole(ctx, role);
            if (!hasPermission) {
                throw new NotAuthorizedException();
            }

            return originalMethod.apply(this, args);
        };
    };
}
