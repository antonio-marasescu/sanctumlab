import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipesState, RecipesStateFeatureName } from './recipes.reducers';
import { RecipeDto } from '@sanctumlab/api-interfaces';

const selectRecipesFeatureState = () =>
    createFeatureSelector<RecipesState>(RecipesStateFeatureName);

const selectRecipes = () =>
    createSelector(selectRecipesFeatureState(), state => {
        return (state.ids.map(id => state.entities[id]) as RecipeDto[]) || [];
    });

const selectRecipeById = (id: string) =>
    createSelector(selectRecipesFeatureState(), state => {
        return state.entities[id] as RecipeDto;
    });

const selectCurrentRecipe = () =>
    createSelector(selectRecipesFeatureState(), state => {
        if (!state.currentRecipeId) return null;
        return state.entities[state.currentRecipeId] as RecipeDto;
    });

const selectRecipesStateLoading = () =>
    createSelector(selectRecipesFeatureState(), state => {
        return state.loading;
    });

const selectRecipesStateErrorReason = () =>
    createSelector(selectRecipesFeatureState(), state => {
        return state.errorReason ?? null;
    });

export const RecipesSelectors = {
    selectRecipes,
    selectRecipeById,
    selectCurrentRecipe,
    selectRecipesStateLoading,
    selectRecipesStateErrorReason
};
