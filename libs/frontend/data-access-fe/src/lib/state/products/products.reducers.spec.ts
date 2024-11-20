import {
    productsInitialState,
    ProductsState,
    productsStateReducer
} from './products.reducers';
import { ProductsActions } from './products.actions';
import {
    createMockCreateProductItemDto,
    createMockProductItemDto,
    createMockUpdateProductItemDto
} from '@sanctumlab/api-interfaces';

describe('ProductsReducer', () => {
    it('should return the default state for unknown action', () => {
        const initialState = productsInitialState;
        const action = {
            type: 'Unknown'
        };
        const state = productsStateReducer(initialState, action);

        expect(state).toBe(initialState);
    });

    describe('createProductAction', () => {
        it('should set loading for state for create product action in an immutable way', () => {
            const payload = createMockCreateProductItemDto();
            const action = ProductsActions.createProduct({ product: payload });
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: true
            };

            const state = productsStateReducer(productsInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(productsInitialState);
        });

        it('should add product to state for create product success action in an immutable way', () => {
            const payload = createMockProductItemDto();
            const action = ProductsActions.createProductSuccess({
                product: payload
            });
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: false,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = productsStateReducer(productsInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(productsInitialState);
        });
    });

    describe('updateProductAction', () => {
        it('should set loading for state for update product action in an immutable way', () => {
            const payloadId = '1234';
            const payload = createMockUpdateProductItemDto();
            const action = ProductsActions.updateProduct({
                id: payloadId,
                product: payload
            });
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: true
            };

            const state = productsStateReducer(productsInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(productsInitialState);
        });

        it('should update product to state for create product success action in an immutable way', () => {
            const payloadId = '1234';
            const payload = createMockProductItemDto({
                id: payloadId,
                name: 'Test 02'
            });

            const action = ProductsActions.updateProductSuccess({
                product: payload
            });

            const oldProduct = createMockProductItemDto({
                id: payloadId,
                name: 'Test 01'
            });
            const initialState: ProductsState = {
                ...productsInitialState,
                loading: false,
                entities: {
                    [payloadId]: oldProduct
                },
                ids: [payloadId]
            };
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: false,
                entities: {
                    [payloadId]: payload
                },
                ids: [payloadId]
            };

            const state = productsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('removeProductAction', () => {
        it('should set loading for state for remove product action in an immutable way', () => {
            const payload = '1234';
            const action = ProductsActions.removeProduct({ id: payload });
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: true
            };

            const state = productsStateReducer(productsInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(productsInitialState);
        });

        it('should remove product from state for remove product success action in an immutable way', () => {
            const payload = createMockProductItemDto();
            const action = ProductsActions.removeProductSuccess({
                id: payload.id
            });
            const initialState: ProductsState = {
                ...productsInitialState,
                loading: true,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: false
            };

            const state = productsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('getProductListAction', () => {
        it('should set loading for state for get product list action in an immutable way', () => {
            const action = ProductsActions.getProductList();
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: true
            };

            const state = productsStateReducer(productsInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(productsInitialState);
        });

        it('should add products to state for get product list success action in an immutable way', () => {
            const payload = createMockProductItemDto();
            const action = ProductsActions.getProductListSuccess({
                products: [payload]
            });
            const initialState: ProductsState = {
                ...productsInitialState,
                loading: true
            };
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: false,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = productsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('getProductByIdAction', () => {
        it('should set loading for state for get product by id action in an immutable way', () => {
            const payload = '1234';
            const action = ProductsActions.getProductById({ id: payload });
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: true
            };

            const state = productsStateReducer(productsInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(productsInitialState);
        });

        it('should add one product to state for get product by id success action in an immutable way', () => {
            const payload = createMockProductItemDto();
            const action = ProductsActions.getProductByIdSuccess({
                product: payload
            });
            const initialState: ProductsState = {
                ...productsInitialState,
                loading: true
            };
            const expectedState: ProductsState = {
                ...productsInitialState,
                loading: false,
                currentProductId: payload.id,
                entities: {
                    [payload.id]: payload
                },
                ids: [payload.id]
            };

            const state = productsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('setCurrentProductAction', () => {
        it('should set current product for state for set current product action in an immutable way', () => {
            const payload = '1234';
            const action = ProductsActions.setCurrentProduct({ id: payload });
            const expectedState: ProductsState = {
                ...productsInitialState,
                currentProductId: payload
            };

            const state = productsStateReducer(productsInitialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(productsInitialState);
        });

        it('should unset current product for state for unset current product action in an immutable way', () => {
            const oldStateId = '1234';
            const action = ProductsActions.unsetCurrentProduct();
            const initialState: ProductsState = {
                ...productsInitialState,
                currentProductId: oldStateId
            };
            const expectedState: ProductsState = {
                ...productsInitialState,
                currentProductId: null
            };

            const state = productsStateReducer(initialState, action);

            expect(state).toEqual(expectedState);
            expect(state).not.toBe(initialState);
        });
    });

    it('should set error reason and loading for product failure action', () => {
        const oldStateItem = createMockProductItemDto();
        const payload = 'Error Reason';
        const action = ProductsActions.productFailure({
            reason: payload
        });
        const initialState: ProductsState = {
            ...productsInitialState,
            entities: {
                [oldStateItem.id]: oldStateItem
            },
            ids: [oldStateItem.id],
            loading: true,
            errorReason: null
        };

        const expectedState: ProductsState = {
            ...productsInitialState,
            entities: {
                [oldStateItem.id]: oldStateItem
            },
            ids: [oldStateItem.id],
            loading: false,
            errorReason: payload
        };
        const state = productsStateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(initialState);
    });
});
