import {
    RecipesInitialState,
    RecipesState,
    recipesStateReducer
} from './recipes.reducers';
import { RecipesActions } from './recipes.actions';
import {
    createMockCreateRecipeDto,
    createMockRecipeDto,
    createMockUpdateRecipeDto
} from '@sanctumlab/api-interfaces';

describe('RecipesReducer', () => {
    it('should return the default state for unknown action', () => {
        const initialState = RecipesInitialState;
        const action = {
            type: 'Unknown'
        };
        const state = recipesStateReducer(initialState, action);

        expect(state).toBe(initialState);
    });

    describe('createRecipeAction', () => {
        it('should set loading for state for create Recipe action in an immutable way', () => {
            const payload = createMockCreateRecipeDto();
            const action = RecipesActions.createRecipe({
                recipe: payload
            });
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: true
            };

            const state = recipesStateReducer(RecipesInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(RecipesInitialState);
        });

        it('should add Recipe to state for create Recipe success action in an immutable way', () => {
            const payload = createMockRecipeDto();
            const action = RecipesActions.createRecipeSuccess({
                recipe: payload
            });
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: false,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = recipesStateReducer(RecipesInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(RecipesInitialState);
        });
    });

    describe('updateRecipeAction', () => {
        it('should set loading for state for update Recipe action in an immutable way', () => {
            const payloadId = '1234';
            const payload = createMockUpdateRecipeDto();
            const action = RecipesActions.updateRecipe({
                id: payloadId,
                recipe: payload
            });
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: true
            };

            const state = recipesStateReducer(RecipesInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(RecipesInitialState);
        });

        it('should update Recipe to state for create Recipe success action in an immutable way', () => {
            const payloadId = '1234';
            const payload = createMockRecipeDto({
                id: payloadId,
                name: 'Test 02'
            });

            const action = RecipesActions.updateRecipeSuccess({
                recipe: payload
            });

            const oldRecipe = createMockRecipeDto({
                id: payloadId,
                name: 'Test 01'
            });
            const initialState: RecipesState = {
                ...RecipesInitialState,
                loading: false,
                entities: {
                    [payloadId]: oldRecipe
                },
                ids: [payloadId]
            };
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: false,
                entities: {
                    [payloadId]: payload
                },
                ids: [payloadId]
            };

            const state = recipesStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('removeRecipeAction', () => {
        it('should set loading for state for remove Recipe action in an immutable way', () => {
            const payload = '1234';
            const action = RecipesActions.removeRecipe({ id: payload });
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: true
            };

            const state = recipesStateReducer(RecipesInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(RecipesInitialState);
        });

        it('should remove Recipe from state for remove Recipe success action in an immutable way', () => {
            const payload = createMockRecipeDto();
            const action = RecipesActions.removeRecipeSuccess({
                id: payload.id
            });
            const initialState: RecipesState = {
                ...RecipesInitialState,
                loading: true,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: false
            };

            const state = recipesStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('getRecipeListAction', () => {
        it('should set loading for state for get Recipe list action in an immutable way', () => {
            const action = RecipesActions.getRecipeList();
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: true
            };

            const state = recipesStateReducer(RecipesInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(RecipesInitialState);
        });

        it('should add Recipes to state for get Recipe list success action in an immutable way', () => {
            const payload = createMockRecipeDto();
            const action = RecipesActions.getRecipeListSuccess({
                recipes: [payload]
            });
            const initialState: RecipesState = {
                ...RecipesInitialState,
                loading: true
            };
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: false,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = recipesStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('getRecipeByIdAction', () => {
        it('should set loading for state for get Recipe by id action in an immutable way', () => {
            const payload = '1234';
            const action = RecipesActions.getRecipeById({
                id: payload
            });
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: true
            };

            const state = recipesStateReducer(RecipesInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(RecipesInitialState);
        });

        it('should add one Recipe to state for get Recipe by id success action in an immutable way', () => {
            const payload = createMockRecipeDto();
            const action = RecipesActions.getRecipeByIdSuccess({
                recipe: payload
            });
            const initialState: RecipesState = {
                ...RecipesInitialState,
                loading: true
            };
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                loading: false,
                currentRecipeId: payload.id,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = recipesStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('setCurrentRecipeAction', () => {
        it('should set current Recipe for state for set current Recipe action in an immutable way', () => {
            const payload = '1234';
            const action = RecipesActions.setCurrentRecipe({
                id: payload
            });
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                currentRecipeId: payload
            };

            const state = recipesStateReducer(RecipesInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(RecipesInitialState);
        });

        it('should unset current Recipe for state for unset current Recipe action in an immutable way', () => {
            const oldStateId = '1234';
            const action = RecipesActions.unsetCurrentRecipe();
            const initialState: RecipesState = {
                ...RecipesInitialState,
                currentRecipeId: oldStateId
            };
            const expectedState: RecipesState = {
                ...RecipesInitialState,
                currentRecipeId: null
            };

            const state = recipesStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    it('should set error reason and loading for Recipe failure action', () => {
        const oldStateItem = createMockRecipeDto();
        const payload = 'Error Reason';
        const action = RecipesActions.recipeFailure({
            reason: payload
        });
        const initialState: RecipesState = {
            ...RecipesInitialState,
            entities: {
                [oldStateItem.id]: oldStateItem
            },
            ids: [oldStateItem.id],
            loading: true,
            errorReason: null
        };

        const expectedState: RecipesState = {
            ...RecipesInitialState,
            entities: {
                [oldStateItem.id]: oldStateItem
            },
            ids: [oldStateItem.id],
            loading: false,
            errorReason: payload
        };
        const state = recipesStateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(initialState);
    });
});
