import { Routes } from '@angular/router';
import { MenuRootComponent } from './components/menu-root.component';
import { MenuFeatureRoutes } from '@sanctumlab/fe/shared-fe';
import { ProductItemCategory } from '@sanctumlab/api-interfaces';
import { provideState } from '@ngrx/store';
import { MenuStateFeatureName, menuStateReducer } from './state/menu.reducers';

export const menuFeatureRoutes: Routes = [
    {
        path: '',
        component: MenuRootComponent,
        providers: [provideState(MenuStateFeatureName, menuStateReducer)],
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
                    ).then(mod => mod.MenuItemCreatePageComponent)
            },
            {
                path: `${MenuFeatureRoutes.EDIT}/:id`,
                loadComponent: () =>
                    import(
                        './components/pages/menu-item-edit-page.component'
                    ).then(mod => mod.MenuItemEditPageComponent)
            },
            {
                path: '**',
                redirectTo: MenuFeatureRoutes.COCKTAILS
            }
        ],
        canActivate: []
    }
];
