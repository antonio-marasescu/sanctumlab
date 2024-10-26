import { Routes } from '@angular/router';
import { MenuRootComponent } from './components/menu-root.component';
import { MenuFeatureRoutes } from '@sanctumlab/fe/shared-fe';
import { ProductItemCategory } from '@sanctumlab/api-interfaces';

export const menuFeatureRoutes: Routes = [
    {
        path: '',
        component: MenuRootComponent,
        children: [
            {
                path: MenuFeatureRoutes.COCKTAILS,
                loadComponent: () =>
                    import('./components/pages/menu-list-page.component').then(
                        mod => mod.MenuListPageComponent
                    ),
                data: {
                    category: ProductItemCategory.Cocktail
                }
            },
            {
                path: MenuFeatureRoutes.SNACKS,
                loadComponent: () =>
                    import('./components/pages/menu-list-page.component').then(
                        mod => mod.MenuListPageComponent
                    ),
                data: {
                    category: ProductItemCategory.Snacks
                }
            },
            {
                path: '**',
                redirectTo: MenuFeatureRoutes.COCKTAILS
            }
        ],
        canActivate: []
    }
];
