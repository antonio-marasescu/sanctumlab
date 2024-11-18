import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFeatureName, AuthRoutes } from '../types/auth-navigation.types';

export const authenticatedGuard = async (): Promise<boolean> => {
    const authService = inject(AuthenticationService);
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    const queryParams = route.snapshot.queryParams;
    const isAuthenticated = await authService.isAuthenticated();

    if (!isAuthenticated) {
        await router.navigate([AuthFeatureName, AuthRoutes.LOGIN], {
            queryParams
        });
        return true;
    }

    return isAuthenticated;
};
