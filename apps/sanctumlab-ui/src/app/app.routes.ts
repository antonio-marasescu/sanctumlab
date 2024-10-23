import { Route } from '@angular/router';
import { AppFeatureRoutes } from '@sanctumlab/fe/shared-fe';
import { authenticatedGuard, authFeatureRoutes } from '@sanctumlab/fe/auth';

export const appRoutes: Route[] = [
    {
        path: AppFeatureRoutes.MENU,
        loadChildren: () =>
            import('@sanctumlab/fe/menu-feature').then(
                feat => feat.menuFeatureRoutes
            ),
        canActivate: [authenticatedGuard]
    },
    {
        path: AppFeatureRoutes.AUTH,
        children: [...authFeatureRoutes]
    },
    {
        path: '**',
        redirectTo: AppFeatureRoutes.MENU
    }
];
