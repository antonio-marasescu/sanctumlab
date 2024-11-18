import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthFeatureName, AuthRoutes } from '../types/auth-navigation.types';

export const authenticatedGuard = async (
    activatedRouteSnapshot: ActivatedRouteSnapshot
): Promise<boolean> => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    const queryParams = activatedRouteSnapshot.queryParams;

    const isAuthenticated = await authService.isAuthenticated();

    if (!isAuthenticated) {
        await router.navigate([AuthFeatureName, AuthRoutes.LOGIN], {
            queryParams
        });
        return true;
    }

    return isAuthenticated;
};
