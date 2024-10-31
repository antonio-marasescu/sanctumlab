import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsClientService } from '../../clients/products-client.service';
import { ProductsActions } from './products.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
                    catchError((error: HttpErrorResponse) =>
                        of(
                            ProductsActions.productFailure({
                                reason: error.message
                            })
                        )
                    )
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
                    catchError((error: HttpErrorResponse) =>
                        of(
                            ProductsActions.productFailure({
                                reason: error.message
                            })
                        )
                    )
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
                    catchError((error: HttpErrorResponse) =>
                        of(
                            ProductsActions.productFailure({
                                reason: error.message
                            })
                        )
                    )
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
                    catchError((error: HttpErrorResponse) =>
                        of(
                            ProductsActions.productFailure({
                                reason: error.message
                            })
                        )
                    )
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
                    catchError((error: HttpErrorResponse) =>
                        of(
                            ProductsActions.productFailure({
                                reason: error.message
                            })
                        )
                    )
                )
            )
        )
    );
}
