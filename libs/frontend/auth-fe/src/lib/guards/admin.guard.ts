import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AuthFeatureName, AuthRoutes } from '../types/auth-navigation.types';

export const adminGuard = async (): Promise<boolean> => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);
    const isAdmin = await authService.isAdmin();

    if (!isAdmin) {
        await router.navigate([AuthFeatureName, AuthRoutes.UNAUTHORIZED]);
        return false;
    }

    return true;
};
