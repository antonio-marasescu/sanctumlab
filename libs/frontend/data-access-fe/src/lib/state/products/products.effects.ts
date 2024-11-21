import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsClientService } from '../../clients/products-client.service';
import { ProductsActions } from './products.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsActions } from '../notifications/notifications.actions';
import { createNotificationHttpError } from '../../utils/notifications.utils';

@Injectable()
export class ProductsEffects {
    private readonly actions$ = inject(Actions);
    private readonly client = inject(ProductsClientService);

    createProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.createProduct),
            exhaustMap(action =>
                this.client.createProduct(action.product).pipe(
                    map(product =>
                        ProductsActions.createProductSuccess({ product })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        ProductsActions.productFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'PRODUCT_CREATE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.updateProduct),
            exhaustMap(action =>
                this.client.updateProduct(action.id, action.product).pipe(
                    map(product =>
                        ProductsActions.updateProductSuccess({ product })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        ProductsActions.productFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'PRODUCT_UPDATE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    removeProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.removeProduct),
            exhaustMap(action =>
                this.client.removeProduct(action.id).pipe(
                    map(() =>
                        ProductsActions.removeProductSuccess({ id: action.id })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        ProductsActions.productFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'PRODUCT_REMOVE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    getProductList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.getProductList),
            exhaustMap(() =>
                this.client.retrieveProducts().pipe(
                    map(products =>
                        ProductsActions.getProductListSuccess({ products })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        ProductsActions.productFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'PRODUCT_RETRIEVE_ALL_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    getProductById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.getProductById),
            exhaustMap(action =>
                this.client.retrieveProductById(action.id).pipe(
                    map(product =>
                        ProductsActions.getProductByIdSuccess({ product })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        ProductsActions.productFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'PRODUCT_RETRIEVE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );
}
