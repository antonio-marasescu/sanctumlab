import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    IngredientsState,
    IngredientsStateFeatureName
} from './ingredients.reducers';
import { IngredientDto } from '@sanctumlab/api-interfaces';

const selectIngredientsFeatureState = () =>
    createFeatureSelector<IngredientsState>(IngredientsStateFeatureName);

const selectIngredients = () =>
    createSelector(selectIngredientsFeatureState(), state => {
        return (
            (state.ids.map(id => state.entities[id]) as IngredientDto[]) || []
        );
    });

const selectIngredientById = (id: string) =>
    createSelector(selectIngredientsFeatureState(), state => {
        return state.entities[id] as IngredientDto;
    });

const selectCurrentIngredient = () =>
    createSelector(selectIngredientsFeatureState(), state => {
        if (!state.currentIngredientId) return null;
        return state.entities[state.currentIngredientId] as IngredientDto;
    });

const selectIngredientsStateLoading = () =>
    createSelector(selectIngredientsFeatureState(), state => {
        return state.loading;
    });

const selectIngredientsStateErrorReason = () =>
    createSelector(selectIngredientsFeatureState(), state => {
        return state.errorReason ?? null;
    });

export const IngredientsSelectors = {
    selectIngredients,
    selectIngredientById,
    selectCurrentIngredient,
    selectIngredientsStateLoading,
    selectIngredientsStateErrorReason
};
