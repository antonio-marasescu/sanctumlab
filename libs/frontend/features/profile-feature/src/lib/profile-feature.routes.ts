import { Routes } from '@angular/router';
import { ProfileFeatureRoutes } from '@sanctumlab/fe/shared';
import { ProfileRootComponent } from './components/profile-root.component';

export const profileFeatureRoutes: Routes = [
    {
        path: '',
        component: ProfileRootComponent,
        providers: [],
        children: [
            {
                path: ProfileFeatureRoutes.SETTINGS,
                loadComponent: () =>
                    import(
                        './components/pages/profile-settings-page.component'
                    ).then(mod => mod.ProfileSettingsPageComponent)
            },
            {
                path: '**',
                redirectTo: ProfileFeatureRoutes.SETTINGS
            }
        ],
        canActivate: []
    }
];
