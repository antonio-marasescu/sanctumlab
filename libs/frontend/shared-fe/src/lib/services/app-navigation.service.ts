import { Injectable } from '@angular/core';
import {
    ActivatedRoute,
    Params,
    QueryParamsHandling,
    Router
} from '@angular/router';
import {
    AppFeatureRoutes,
    MenuFeatureRoutes,
    ProfileFeatureRoutes
} from '../types/app-routes.types';

@Injectable({ providedIn: 'root' })
export class AppNavigationService {
    constructor(
        private readonly router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

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

    public async navigateToProfileSettings(): Promise<void> {
        await this.router.navigate([
            AppFeatureRoutes.PROFILE,
            ProfileFeatureRoutes.SETTINGS
        ]);
    }

    public async applyQueryParamsToRoute(
        params: Params,
        strategy: QueryParamsHandling = 'replace'
    ): Promise<void> {
        await this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: params,
            queryParamsHandling: strategy
        });
    }
}
