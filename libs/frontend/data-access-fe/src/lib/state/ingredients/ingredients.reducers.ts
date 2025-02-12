import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IngredientDto } from '@sanctumlab/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { IngredientsActions } from './ingredients.actions';

export const IngredientsStateFeatureName = 'ingredients';

export interface IngredientsState extends EntityState<IngredientDto> {
    currentIngredientId: string | null;
    errorReason: string | null;
    loading: boolean;
}

export const IngredientsStateAdapter: EntityAdapter<IngredientDto> =
    createEntityAdapter<IngredientDto>({
        selectId: item => item.id
    });

export const IngredientsInitialState: IngredientsState =
    IngredientsStateAdapter.getInitialState({
        currentIngredientId: null,
        errorReason: null,
        loading: false
    });

export const ingredientsStateReducer = createReducer(
    IngredientsInitialState,
    on(IngredientsActions.createIngredient, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(IngredientsActions.createIngredientSuccess, (state, { ingredient }) => {
        return IngredientsStateAdapter.addOne(ingredient, {
            ...state,
            loading: false
        });
    }),
    on(IngredientsActions.updateIngredient, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(IngredientsActions.updateIngredientSuccess, (state, { ingredient }) => {
        return IngredientsStateAdapter.upsertOne(ingredient, {
            ...state,
            loading: false
        });
    }),
    on(IngredientsActions.removeIngredient, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(IngredientsActions.removeIngredientSuccess, (state, { id }) => {
        return IngredientsStateAdapter.removeOne(id, {
            ...state,
            loading: false
        });
    }),
    on(IngredientsActions.getIngredientList, state => {
        return {
            ...state,
            currentIngredientId: null,
            loading: true
        };
    }),
    on(
        IngredientsActions.getIngredientListSuccess,
        (state, { ingredients }) => {
            return IngredientsStateAdapter.setAll(ingredients, {
                ...state,
                loading: false
            });
        }
    ),
    on(IngredientsActions.getIngredientById, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(IngredientsActions.getIngredientByIdSuccess, (state, { ingredient }) => {
        return IngredientsStateAdapter.setOne(ingredient, {
            ...state,
            currentIngredientId: ingredient.id,
            loading: false
        });
    }),
    on(IngredientsActions.setCurrentIngredient, (state, { id }) => {
        return {
            ...state,
            currentIngredientId: id
        };
    }),
    on(IngredientsActions.unsetCurrentIngredient, state => {
        return {
            ...state,
            currentIngredientId: null
        };
    }),
    on(IngredientsActions.ingredientFailure, (state, { reason }) => {
        return {
            ...state,
            loading: false,
            errorReason: reason
        };
    })
);
