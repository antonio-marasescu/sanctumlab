import { Routes } from '@angular/router';
import { MenuRootComponent } from './components/menu-root.component';
import { MenuFeatureRoutes } from '@sanctumlab/fe/shared';
import { ProductItemCategory } from '@sanctumlab/api-interfaces';
import { adminGuard } from '@sanctumlab/fe/auth';
import { provideEffects } from '@ngrx/effects';
import { MenuEffects } from './state/menu.effects';

export const menuFeatureRoutes: Routes = [
    {
        path: '',
        component: MenuRootComponent,
        providers: [provideEffects(MenuEffects)],
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
                path: MenuFeatureRoutes.CREATE,
                loadComponent: () =>
                    import(
                        './components/pages/menu-item-create-page.component'
                    ).then(mod => mod.MenuItemCreatePageComponent),
                canActivate: [adminGuard]
            },
            {
                path: `${MenuFeatureRoutes.EDIT}/:id`,
                loadComponent: () =>
                    import(
                        './components/pages/menu-item-edit-page.component'
                    ).then(mod => mod.MenuItemEditPageComponent),
                canActivate: [adminGuard]
            },
            {
                path: '**',
                redirectTo: MenuFeatureRoutes.COCKTAILS
            }
        ],
        canActivate: []
    }
];
