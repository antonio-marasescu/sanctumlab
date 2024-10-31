import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import {
    ProductsStateFeatureName,
    productsStateReducer
} from '../state/products/products.reducers';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from '../state/products/products.effects';

export const provideDataAccessState = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideState(ProductsStateFeatureName, productsStateReducer),
        provideEffects(ProductsEffects)
    ]);
