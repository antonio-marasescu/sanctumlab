import { Route } from '@angular/router';
import { AppFeatureRoutes } from '@sanctumlab/fe/shared-fe';

export const appRoutes: Route[] = [
    {
        path: AppFeatureRoutes.MENU,
        loadChildren: () =>
            import('@sanctumlab/fe/menu-feature').then(
                feat => feat.menuFeatureRoutes
            )
    },
    {
        path: '**',
        redirectTo: AppFeatureRoutes.MENU
    }
];
