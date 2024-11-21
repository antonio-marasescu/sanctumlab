import { Route } from '@angular/router';
import { AppFeatureRoutes } from '@sanctumlab/fe/shared';
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
        path: AppFeatureRoutes.PROFILE,
        loadChildren: () =>
            import('@sanctumlab/fe/profile-feature').then(
                feat => feat.profileFeatureRoutes
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
