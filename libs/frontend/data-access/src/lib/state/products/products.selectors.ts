import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, ProductsStateFeatureName } from './products.reducers';
import {
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';

export const selectProductsFeatureState = () =>
    createFeatureSelector<ProductsState>(ProductsStateFeatureName);

export const selectProductsByCategory = (category: ProductItemCategory) =>
    createSelector(selectProductsFeatureState(), state => {
        return (
            (state.ids
                .map(id => state.entities[id])
                .filter(
                    item => item?.category === category
                ) as ProductItemDto[]) || []
        );
    });

export const selectProductById = (id: string) =>
    createSelector(selectProductsFeatureState(), state => {
        return state.entities[id] as ProductItemDto;
    });

export const selectCurrentProduct = () =>
    createSelector(selectProductsFeatureState(), state => {
        if (!state.currentProductId) return null;
        return state.entities[state.currentProductId] as ProductItemDto;
    });

export const selectProductsStateLoading = () =>
    createSelector(selectProductsFeatureState(), state => {
        return state.loading;
    });

export const selectProductsStateErrorReason = () =>
    createSelector(selectProductsFeatureState(), state => {
        return state.errorReason ?? null;
    });
