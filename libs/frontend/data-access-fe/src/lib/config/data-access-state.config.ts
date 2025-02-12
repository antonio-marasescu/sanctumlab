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
import { IngredientsEffects } from '../state/ingredients/ingredients.effects';
import { RecipesEffects } from '../state/recipes/recipes.effects';
import {
    IngredientsStateFeatureName,
    ingredientsStateReducer
} from '../state/ingredients/ingredients.reducers';
import {
    RecipesStateFeatureName,
    recipesStateReducer
} from '../state/recipes/recipes.reducers';

export const provideDataAccessState = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideState(ProductsStateFeatureName, productsStateReducer),
        provideState(NotificationsStateFeatureName, notificationsStateReducer),
        provideState(IngredientsStateFeatureName, ingredientsStateReducer),
        provideState(RecipesStateFeatureName, recipesStateReducer),
        provideEffects(
            ProductsEffects,
            NotificationsEffects,
            IngredientsEffects,
            RecipesEffects
        )
    ]);
