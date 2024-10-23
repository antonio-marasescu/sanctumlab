import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AuthFeatureName, AuthRoutes } from '../types/auth-navigation.types';

export const authenticatedGuard = async (): Promise<boolean> => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    const isAuthenticated = await authService.isAuthenticated();

    if (!isAuthenticated) {
        await router.navigate([AuthFeatureName, AuthRoutes.LOGIN]);
        return true;
    }

    return isAuthenticated;
};
