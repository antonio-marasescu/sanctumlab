import {
    IngredientsInitialState,
    IngredientsState,
    ingredientsStateReducer
} from './ingredients.reducers';
import { IngredientsActions } from './ingredients.actions';
import {
    createMockCreateIngredientDto,
    createMockIngredientDto,
    createMockUpdateIngredientDto
} from '@sanctumlab/api-interfaces';

describe('IngredientsReducer', () => {
    it('should return the default state for unknown action', () => {
        const initialState = IngredientsInitialState;
        const action = {
            type: 'Unknown'
        };
        const state = ingredientsStateReducer(initialState, action);

        expect(state).toBe(initialState);
    });

    describe('createIngredientAction', () => {
        it('should set loading for state for create Ingredient action in an immutable way', () => {
            const payload = createMockCreateIngredientDto();
            const action = IngredientsActions.createIngredient({
                ingredient: payload
            });
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: true
            };

            const state = ingredientsStateReducer(
                IngredientsInitialState,
                action
            );

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(IngredientsInitialState);
        });

        it('should add Ingredient to state for create Ingredient success action in an immutable way', () => {
            const payload = createMockIngredientDto();
            const action = IngredientsActions.createIngredientSuccess({
                ingredient: payload
            });
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: false,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = ingredientsStateReducer(
                IngredientsInitialState,
                action
            );

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(IngredientsInitialState);
        });
    });

    describe('updateIngredientAction', () => {
        it('should set loading for state for update Ingredient action in an immutable way', () => {
            const payloadId = '1234';
            const payload = createMockUpdateIngredientDto();
            const action = IngredientsActions.updateIngredient({
                id: payloadId,
                ingredient: payload
            });
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: true
            };

            const state = ingredientsStateReducer(
                IngredientsInitialState,
                action
            );

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(IngredientsInitialState);
        });

        it('should update Ingredient to state for create Ingredient success action in an immutable way', () => {
            const payloadId = '1234';
            const payload = createMockIngredientDto({
                id: payloadId,
                name: 'Test 02'
            });

            const action = IngredientsActions.updateIngredientSuccess({
                ingredient: payload
            });

            const oldIngredient = createMockIngredientDto({
                id: payloadId,
                name: 'Test 01'
            });
            const initialState: IngredientsState = {
                ...IngredientsInitialState,
                loading: false,
                entities: {
                    [payloadId]: oldIngredient
                },
                ids: [payloadId]
            };
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: false,
                entities: {
                    [payloadId]: payload
                },
                ids: [payloadId]
            };

            const state = ingredientsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('removeIngredientAction', () => {
        it('should set loading for state for remove Ingredient action in an immutable way', () => {
            const payload = '1234';
            const action = IngredientsActions.removeIngredient({ id: payload });
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: true
            };

            const state = ingredientsStateReducer(
                IngredientsInitialState,
                action
            );

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(IngredientsInitialState);
        });

        it('should remove Ingredient from state for remove Ingredient success action in an immutable way', () => {
            const payload = createMockIngredientDto();
            const action = IngredientsActions.removeIngredientSuccess({
                id: payload.id
            });
            const initialState: IngredientsState = {
                ...IngredientsInitialState,
                loading: true,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: false
            };

            const state = ingredientsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('getIngredientListAction', () => {
        it('should set loading for state for get Ingredient list action in an immutable way', () => {
            const action = IngredientsActions.getIngredientList();
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: true
            };

            const state = ingredientsStateReducer(
                IngredientsInitialState,
                action
            );

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(IngredientsInitialState);
        });

        it('should add Ingredients to state for get Ingredient list success action in an immutable way', () => {
            const payload = createMockIngredientDto();
            const action = IngredientsActions.getIngredientListSuccess({
                ingredients: [payload]
            });
            const initialState: IngredientsState = {
                ...IngredientsInitialState,
                loading: true
            };
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: false,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = ingredientsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('getIngredientByIdAction', () => {
        it('should set loading for state for get Ingredient by id action in an immutable way', () => {
            const payload = '1234';
            const action = IngredientsActions.getIngredientById({
                id: payload
            });
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: true
            };

            const state = ingredientsStateReducer(
                IngredientsInitialState,
                action
            );

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(IngredientsInitialState);
        });

        it('should add one Ingredient to state for get Ingredient by id success action in an immutable way', () => {
            const payload = createMockIngredientDto();
            const action = IngredientsActions.getIngredientByIdSuccess({
                ingredient: payload
            });
            const initialState: IngredientsState = {
                ...IngredientsInitialState,
                loading: true
            };
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                loading: false,
                currentIngredientId: payload.id,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = ingredientsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('setCurrentIngredientAction', () => {
        it('should set current Ingredient for state for set current Ingredient action in an immutable way', () => {
            const payload = '1234';
            const action = IngredientsActions.setCurrentIngredient({
                id: payload
            });
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                currentIngredientId: payload
            };

            const state = ingredientsStateReducer(
                IngredientsInitialState,
                action
            );

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(IngredientsInitialState);
        });

        it('should unset current Ingredient for state for unset current Ingredient action in an immutable way', () => {
            const oldStateId = '1234';
            const action = IngredientsActions.unsetCurrentIngredient();
            const initialState: IngredientsState = {
                ...IngredientsInitialState,
                currentIngredientId: oldStateId
            };
            const expectedState: IngredientsState = {
                ...IngredientsInitialState,
                currentIngredientId: null
            };

            const state = ingredientsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    it('should set error reason and loading for Ingredient failure action', () => {
        const oldStateItem = createMockIngredientDto();
        const payload = 'Error Reason';
        const action = IngredientsActions.ingredientFailure({
            reason: payload
        });
        const initialState: IngredientsState = {
            ...IngredientsInitialState,
            entities: {
                [oldStateItem.id]: oldStateItem
            },
            ids: [oldStateItem.id],
            loading: true,
            errorReason: null
        };

        const expectedState: IngredientsState = {
            ...IngredientsInitialState,
            entities: {
                [oldStateItem.id]: oldStateItem
            },
            ids: [oldStateItem.id],
            loading: false,
            errorReason: payload
        };
        const state = ingredientsStateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(initialState);
    });
});
