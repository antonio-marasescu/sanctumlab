import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createMockDataAccessInitialState } from '../state/_mocks/state.mocks';
import { ProductApiService } from './product-api.service';
import { ProductsSelectors } from '../state/products/products.selectors';
import {
    createMockCreateProductItemDto,
    createMockProductItemDto,
    createMockUpdateProductItemDto,
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';
import { cold } from 'jest-marbles';
import { ProductsActions } from '../state/products/products.actions';

describe('ProductApiService', () => {
    const initialState = createMockDataAccessInitialState();
    let service: ProductApiService;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState
                }),
                ProductApiService
            ]
        });
        service = TestBed.inject(ProductApiService);
        store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve products by category stream', () => {
        const expectedProducts: ProductItemDto[] = [
            createMockProductItemDto({ id: '1234' })
        ];
        const targetCategory = ProductItemCategory.Snacks;

        const mockSelect =
            ProductsSelectors.selectProductsByCategory(targetCategory);
        jest.spyOn(
            ProductsSelectors,
            'selectProductsByCategory'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedProducts);
        store.refreshState();

        const expected = cold('(a)', { a: expectedProducts });
        expect(
            service.retrieveProductsByCategoryStream(targetCategory)
        ).toBeObservable(expected);
    });

    it('should retrieve products is loading stream', () => {
        const expectedResponse = false;

        const mockSelect = ProductsSelectors.selectProductsStateLoading();
        jest.spyOn(
            ProductsSelectors,
            'selectProductsStateLoading'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveProductsIsLoadingStream()).toBeObservable(
            expected
        );
    });

    it('should retrieve product by id stream', () => {
        const targetId = '1234';
        const expectedResponse = createMockProductItemDto({ id: targetId });

        const mockSelect = ProductsSelectors.selectProductById(targetId);
        jest.spyOn(ProductsSelectors, 'selectProductById').mockImplementation(
            () => mockSelect
        );
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveProductByIdStream(targetId)).toBeObservable(
            expected
        );
    });

    it('should retrieve current product stream', () => {
        const expectedResponse = createMockProductItemDto();

        const mockSelect = ProductsSelectors.selectCurrentProduct();
        jest.spyOn(
            ProductsSelectors,
            'selectCurrentProduct'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveCurrentProductStream()).toBeObservable(expected);
    });

    it('should dispatch retrieve product list', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRetrieveProductList();
        expect(dispatchSpy).toHaveBeenCalledWith(
            ProductsActions.getProductList()
        );
    });

    it('should dispatch retrieve product by id', () => {
        const payload = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRetrieveProductById(payload);
        expect(dispatchSpy).toHaveBeenCalledWith(
            ProductsActions.getProductById({ id: payload })
        );
    });

    it('should dispatch create product', () => {
        const payload = createMockCreateProductItemDto();
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendCreateProduct(payload);
        expect(dispatchSpy).toHaveBeenCalledWith(
            ProductsActions.createProduct({ product: payload })
        );
    });

    it('should dispatch update product', () => {
        const payloadId = '1234';
        const payloadBody = createMockUpdateProductItemDto();
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendUpdateProduct(payloadId, payloadBody);
        expect(dispatchSpy).toHaveBeenCalledWith(
            ProductsActions.updateProduct({
                product: payloadBody,
                id: payloadId
            })
        );
    });

    it('should dispatch remove product', () => {
        const payloadId = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRemoveProduct(payloadId);
        expect(dispatchSpy).toHaveBeenCalledWith(
            ProductsActions.removeProduct({
                id: payloadId
            })
        );
    });

    it('should dispatch set current product', () => {
        const payloadId = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendSetCurrentProduct(payloadId);
        expect(dispatchSpy).toHaveBeenCalledWith(
            ProductsActions.setCurrentProduct({
                id: payloadId
            })
        );
    });

    it('should dispatch unset current product', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendUnsetCurrentProduct();
        expect(dispatchSpy).toHaveBeenCalledWith(
            ProductsActions.unsetCurrentProduct()
        );
    });
});
