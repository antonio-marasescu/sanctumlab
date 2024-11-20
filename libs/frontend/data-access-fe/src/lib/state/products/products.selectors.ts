import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, ProductsStateFeatureName } from './products.reducers';
import {
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';

const selectProductsFeatureState = () =>
    createFeatureSelector<ProductsState>(ProductsStateFeatureName);

const selectProductsByCategory = (category: ProductItemCategory) =>
    createSelector(selectProductsFeatureState(), state => {
        return (
            (state.ids
                .map(id => state.entities[id])
                .filter(
                    item => item?.category === category
                ) as ProductItemDto[]) || []
        );
    });

const selectProductById = (id: string) =>
    createSelector(selectProductsFeatureState(), state => {
        return state.entities[id] as ProductItemDto;
    });

const selectCurrentProduct = () =>
    createSelector(selectProductsFeatureState(), state => {
        if (!state.currentProductId) return null;
        return state.entities[state.currentProductId] as ProductItemDto;
    });

const selectProductsStateLoading = () =>
    createSelector(selectProductsFeatureState(), state => {
        return state.loading;
    });

const selectProductsStateErrorReason = () =>
    createSelector(selectProductsFeatureState(), state => {
        return state.errorReason ?? null;
    });

export const ProductsSelectors = {
    selectProductsByCategory,
    selectProductById,
    selectCurrentProduct,
    selectProductsStateLoading,
    selectProductsStateErrorReason
};
