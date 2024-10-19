import {
    ApplicationConfig,
    isDevMode,
    provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideIcons } from '@ng-icons/core';
import { matLocalGroceryStoreRound } from '@ng-icons/material-icons/round';
import { matLocalBar, matMenu } from '@ng-icons/material-icons/baseline';

export const appConfig: ApplicationConfig = {
    providers: [
        provideStoreDevtools({ logOnly: !isDevMode() }),
        provideEffects(),
        provideStore(),
        provideIcons({ matLocalGroceryStoreRound, matLocalBar, matMenu }),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes)
    ]
};
