import { UserRole, VerifiedTokenContext } from '../types/cognito.types';

export function extractRoles(tokenContext: VerifiedTokenContext): string[] {
    if (!tokenContext.roles) {
        return [];
    }
    const roles = tokenContext.roles.split(',');
    if (!roles) return [];

    return roles;
}

export function hasRole(
    tokenContext: VerifiedTokenContext,
    role: UserRole
): boolean {
    const roles = extractRoles(tokenContext);
    return roles.includes(role);
}
