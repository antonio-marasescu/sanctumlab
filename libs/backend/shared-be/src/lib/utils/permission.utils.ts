import { hasRole, UserRole, VerifiedTokenContext } from '@sanctumlab/be/auth';
import { NotAuthorizedException } from '../types/exception.types';

export function hasRoleOrThrow(
    ctx: VerifiedTokenContext,
    role: UserRole
): void {
    const hasPermission = hasRole(ctx, role);
    if (!hasPermission) {
        throw new NotAuthorizedException();
    }
}
