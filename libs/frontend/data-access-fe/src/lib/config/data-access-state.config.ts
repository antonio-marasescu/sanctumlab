import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import {
    ProductsStateFeatureName,
    productsStateReducer
} from '../state/products/products.reducers';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from '../state/products/products.effects';
import {
    NotificationsStateFeatureName,
    notificationsStateReducer
} from '../state/notifications/notifications.reducers';
import { NotificationsEffects } from '../state/notifications/notifications.effects';

export const provideDataAccessState = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideState(ProductsStateFeatureName, productsStateReducer),
        provideState(NotificationsStateFeatureName, notificationsStateReducer),
        provideEffects(ProductsEffects, NotificationsEffects)
    ]);
