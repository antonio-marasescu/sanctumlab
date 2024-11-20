import { createMockDataAccessInitialState } from '../_mocks/state.mocks';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ProductsEffects } from './products.effects';
import { ProductsActions } from './products.actions';
import {
    createMockCreateProductItemDto,
    createMockForbiddenException,
    createMockInvalidPayloadException,
    createMockProductItemDto,
    createMockUpdateProductItemDto
} from '@sanctumlab/api-interfaces';
import { hot } from 'jest-marbles';
import { ProductsClientService } from '../../clients/products-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsActions } from '../notifications/notifications.actions';
import { createNotificationHttpError } from '../../utils/notifications.utils';

describe('ProductsEffects', () => {
    const initialState = createMockDataAccessInitialState();
    let actions$ = new Observable<Action>();
    let effects: ProductsEffects;
    let clientServiceMock = beforeEach(() => {
        clientServiceMock = {
            createProduct: jest.fn(),
            updateProduct: jest.fn(),
            removeProduct: jest.fn(),
            retrieveProductById: jest.fn(),
            retrieveProducts: jest.fn()
        };
        actions$ = new Observable<Action>();

        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState
                }),
                provideMockActions(() => actions$),
                ProductsEffects,
                {
                    provide: ProductsClientService,
                    useValue: clientServiceMock
                }
            ]
        });
        effects = TestBed.inject(ProductsEffects);
    });

    describe('createProduct$', () => {
        it('should emit create product success after create product', () => {
            const payloadCreate = createMockCreateProductItemDto();
            const payloadSuccess = createMockProductItemDto();
            clientServiceMock.createProduct.mockReturnValue(of(payloadSuccess));

            actions$ = hot('-a', {
                a: ProductsActions.createProduct({
                    product: payloadCreate
                })
            });
            const expected = hot('-b', {
                b: ProductsActions.createProductSuccess({
                    product: payloadSuccess
                })
            });

            expect(effects.createProduct$).toBeObservable(expected);
        });

        it('should emit error actions after create product invalid payload', () => {
            const payloadCreate = createMockCreateProductItemDto();
            const payloadError = createMockInvalidPayloadException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            clientServiceMock.createProduct.mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: ProductsActions.createProduct({
                    product: payloadCreate
                })
            });
            const expected = hot('-(bc)', {
                b: ProductsActions.productFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'PRODUCT_CREATE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.createProduct$).toBeObservable(expected);
        });
    });

    describe('updateProduct$', () => {
        it('should emit update product success after update product', () => {
            const payloadId = '1234';
            const payloadUpdate = createMockUpdateProductItemDto();
            const payloadSuccess = createMockProductItemDto({ id: payloadId });
            clientServiceMock.updateProduct.mockReturnValue(of(payloadSuccess));

            actions$ = hot('-a', {
                a: ProductsActions.updateProduct({
                    id: payloadId,
                    product: payloadUpdate
                })
            });
            const expected = hot('-b', {
                b: ProductsActions.updateProductSuccess({
                    product: payloadSuccess
                })
            });

            expect(effects.updateProduct$).toBeObservable(expected);
        });

        it('should emit error actions after update product invalid payload', () => {
            const payloadId = '1234';
            const payloadUpdate = createMockUpdateProductItemDto();
            const payloadError = createMockInvalidPayloadException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            clientServiceMock.updateProduct.mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: ProductsActions.updateProduct({
                    id: payloadId,
                    product: payloadUpdate
                })
            });
            const expected = hot('-(bc)', {
                b: ProductsActions.productFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'PRODUCT_UPDATE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.updateProduct$).toBeObservable(expected);
        });
    });

    describe('removeProduct$', () => {
        it('should emit remove product success after remove product', () => {
            const payloadId = '1234';
            clientServiceMock.removeProduct.mockReturnValue(of(null));

            actions$ = hot('-a', {
                a: ProductsActions.removeProduct({
                    id: payloadId
                })
            });
            const expected = hot('-b', {
                b: ProductsActions.removeProductSuccess({
                    id: payloadId
                })
            });

            expect(effects.removeProduct$).toBeObservable(expected);
        });

        it('should emit error actions after remove product forbidden exception', () => {
            const payloadId = '1234';
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            clientServiceMock.removeProduct.mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: ProductsActions.removeProduct({
                    id: payloadId
                })
            });
            const expected = hot('-(bc)', {
                b: ProductsActions.productFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'PRODUCT_REMOVE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.removeProduct$).toBeObservable(expected);
        });
    });

    describe('getProductList$', () => {
        it('should emit get product list success after get product list', () => {
            const payloadSuccess = createMockProductItemDto();
            clientServiceMock.retrieveProducts.mockReturnValue(
                of([payloadSuccess])
            );

            actions$ = hot('-a', {
                a: ProductsActions.getProductList()
            });
            const expected = hot('-b', {
                b: ProductsActions.getProductListSuccess({
                    products: [payloadSuccess]
                })
            });

            expect(effects.getProductList$).toBeObservable(expected);
        });

        it('should emit error actions after get product list forbidden exception', () => {
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            clientServiceMock.retrieveProducts.mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: ProductsActions.getProductList()
            });
            const expected = hot('-(bc)', {
                b: ProductsActions.productFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'PRODUCT_RETRIEVE_ALL_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.getProductList$).toBeObservable(expected);
        });
    });

    describe('getProductById$', () => {
        it('should emit get product by id success after get product by id', () => {
            const payloadId = '1234';
            const payloadSuccess = createMockProductItemDto({ id: payloadId });
            clientServiceMock.retrieveProductById.mockReturnValue(
                of(payloadSuccess)
            );

            actions$ = hot('-a', {
                a: ProductsActions.getProductById({ id: payloadId })
            });
            const expected = hot('-b', {
                b: ProductsActions.getProductByIdSuccess({
                    product: payloadSuccess
                })
            });

            expect(effects.getProductById$).toBeObservable(expected);
        });

        it('should emit error actions after get product by id forbidden exception', () => {
            const payloadId = '1234';
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            clientServiceMock.retrieveProductById.mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: ProductsActions.getProductById({ id: payloadId })
            });
            const expected = hot('-(bc)', {
                b: ProductsActions.productFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'PRODUCT_RETRIEVE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.getProductById$).toBeObservable(expected);
        });
    });
});
