import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from './products.actions';

export const ProductsStateFeatureName = 'products';

export interface ProductsState extends EntityState<ProductItemDto> {
    currentProductId: string | null;
    errorReason: string | null;
    loading: boolean;
}

export const productsStateAdapter: EntityAdapter<ProductItemDto> =
    createEntityAdapter<ProductItemDto>({
        selectId: item => item.id
    });

export const productsInitialState: ProductsState =
    productsStateAdapter.getInitialState({
        currentProductId: null,
        errorReason: null,
        loading: false
    });

export const productsStateReducer = createReducer(
    productsInitialState,
    on(ProductsActions.createProduct, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(ProductsActions.createProductSuccess, (state, { product }) => {
        return productsStateAdapter.addOne(product, {
            ...state,
            loading: false
        });
    }),
    on(ProductsActions.updateProduct, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(ProductsActions.updateProductSuccess, (state, { product }) => {
        return productsStateAdapter.upsertOne(product, {
            ...state,
            loading: false
        });
    }),
    on(ProductsActions.removeProduct, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(ProductsActions.removeProductSuccess, (state, { id }) => {
        return productsStateAdapter.removeOne(id, {
            ...state,
            loading: false
        });
    }),
    on(ProductsActions.getProductList, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(ProductsActions.getProductListSuccess, (state, { products }) => {
        return productsStateAdapter.setAll(products, {
            ...state,
            loading: false
        });
    }),
    on(ProductsActions.getProductById, state => {
        return {
            ...state,
            loading: true
        };
    }),
    on(ProductsActions.getProductByIdSuccess, (state, { product }) => {
        return productsStateAdapter.setOne(product, {
            ...state,
            currentProductId: product.id,
            loading: false
        });
    }),
    on(ProductsActions.setCurrentProduct, (state, { id }) => {
        return {
            ...state,
            currentProductId: id
        };
    }),
    on(ProductsActions.unsetCurrentProduct, state => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductsActions.productFailure, (state, { reason }) => {
        return {
            ...state,
            loading: false,
            errorReason: reason
        };
    })
);
