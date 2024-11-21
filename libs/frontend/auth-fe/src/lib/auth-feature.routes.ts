import { Routes } from '@angular/router';
import { GuestLoginPageComponent } from './components/pages/guest-login-page.component';
import { AuthRoutes } from './types/auth-navigation.types';
import { AdminLoginPageComponent } from './components/pages/admin-login-page.component';
import { UnauthorizedPageComponent } from './components/pages/unauthorized-page.component';

export const authFeatureRoutes: Routes = [
    {
        path: AuthRoutes.LOGIN,
        component: GuestLoginPageComponent
    },
    {
        path: AuthRoutes.LOGIN_ADMIN,
        component: AdminLoginPageComponent
    },
    {
        path: AuthRoutes.UNAUTHORIZED,
        component: UnauthorizedPageComponent
    },
    {
        path: '**',
        redirectTo: AuthRoutes.LOGIN
    }
];
