import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppFeatureRoutes, MenuFeatureRoutes } from '../types/app-routes.types';

@Injectable({ providedIn: 'root' })
export class AppNavigationService {
    constructor(private router: Router) {}

    public async navigateToMenuFeature(): Promise<void> {
        await this.router.navigate([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.MAIN
        ]);
    }
}
