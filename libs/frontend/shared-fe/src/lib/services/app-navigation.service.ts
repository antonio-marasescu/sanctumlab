import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    AppFeatureRoutes,
    AuthFeatureRoutes,
    MenuFeatureRoutes
} from '../types/app-routes.types';

@Injectable({ providedIn: 'root' })
export class AppNavigationService {
    constructor(private readonly router: Router) {}

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

    public async navigateToMenuCreateItem(): Promise<void> {
        await this.router.navigate([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.CREATE
        ]);
    }

    public async navigateToMenuEditItem(id: string): Promise<void> {
        await this.router.navigate([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.EDIT,
            id
        ]);
    }

    public async navigateToLoginPage(): Promise<void> {
        await this.router.navigate([
            AppFeatureRoutes.AUTH,
            AuthFeatureRoutes.LOGIN
        ]);
    }
}
