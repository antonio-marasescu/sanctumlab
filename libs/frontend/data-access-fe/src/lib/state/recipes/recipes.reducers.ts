import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { RecipeDto } from '@sanctumlab/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { RecipesActions } from './recipes.actions';

export const RecipesStateFeatureName = 'recipes';

export interface RecipesState extends EntityState<RecipeDto> {
    currentRecipeId: string | null;
    errorReason: string | null;
    loading: boolean;
}

export const RecipesStateAdapter: EntityAdapter<RecipeDto> =
    createEntityAdapter<RecipeDto>({
        selectId: item => item.id
    });

export const RecipesInitialState: RecipesState =
    RecipesStateAdapter.getInitialState({
        currentRecipeId: null,
        errorReason: null,
        loading: false
    });

export const recipesStateReducer = createReducer(
    RecipesInitialState,
    on(RecipesActions.createRecipe, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(RecipesActions.createRecipeSuccess, (state, { recipe }) => {
        return RecipesStateAdapter.addOne(recipe, {
            ...state,
            loading: false
        });
    }),
    on(RecipesActions.updateRecipe, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(RecipesActions.updateRecipeSuccess, (state, { recipe }) => {
        return RecipesStateAdapter.upsertOne(recipe, {
            ...state,
            loading: false
        });
    }),
    on(RecipesActions.removeRecipe, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(RecipesActions.removeRecipeSuccess, (state, { id }) => {
        return RecipesStateAdapter.removeOne(id, {
            ...state,
            loading: false
        });
    }),
    on(RecipesActions.getRecipeList, state => {
        return {
            ...state,
            currentRecipeId: null,
            loading: true
        };
    }),
    on(RecipesActions.getRecipeListSuccess, (state, { recipes }) => {
        return RecipesStateAdapter.setAll(recipes, {
            ...state,
            loading: false
        });
    }),
    on(RecipesActions.getRecipeById, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(RecipesActions.getRecipeByIdSuccess, (state, { recipe }) => {
        return RecipesStateAdapter.setOne(recipe, {
            ...state,
            currentRecipeId: recipe.id,
            loading: false
        });
    }),
    on(RecipesActions.setCurrentRecipe, (state, { id }) => {
        return {
            ...state,
            currentRecipeId: id
        };
    }),
    on(RecipesActions.unsetCurrentRecipe, state => {
        return {
            ...state,
            currentRecipeId: null
        };
    }),
    on(RecipesActions.recipeFailure, (state, { reason }) => {
        return {
            ...state,
            loading: false,
            errorReason: reason
        };
    })
);
