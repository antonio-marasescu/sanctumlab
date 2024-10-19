import { Routes } from '@angular/router';
import { MenuRootComponent } from './components/menu-root.component';
import { MenuFeatureRoutes } from '@sanctumlab/fe/shared-fe';

export const menuFeatureRoutes: Routes = [
    {
        path: '',
        component: MenuRootComponent,
        children: [
            {
                path: MenuFeatureRoutes.MAIN,
                loadComponent: () =>
                    import('./components/pages/menu-list-page.component').then(
                        mod => mod.MenuListPageComponent
                    )
            },
            {
                path: '**',
                redirectTo: MenuFeatureRoutes.MAIN
            }
        ],
        canActivate: []
    }
];
