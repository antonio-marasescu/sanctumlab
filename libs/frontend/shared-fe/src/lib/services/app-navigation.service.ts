import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    AppFeatureRoutes,
    AuthFeatureRoutes,
    MenuFeatureRoutes
} from '../types/app-routes.types';

@Injectable({ providedIn: 'root' })
export class AppNavigationService {
    constructor(private router: Router) {}

    public async navigateToMenuFeature(): Promise<void> {
        await this.router.navigate([AppFeatureRoutes.MENU]);
    }

    public async navigateToMenuCocktails(): Promise<void> {
        await this.router.navigate([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.COCKTAILS
        ]);
    }

    public async navigateToMenuSnacks(): Promise<void> {
        await this.router.navigate([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.SNACKS
        ]);
    }

    public async navigateToLoginPage(): Promise<void> {
        await this.router.navigate([
            AppFeatureRoutes.AUTH,
            AuthFeatureRoutes.LOGIN
        ]);
    }
}
