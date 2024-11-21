import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { ProductsActions } from '@sanctumlab/fe/data-access';
import { AppNavigationService } from '@sanctumlab/fe/shared';

@Injectable()
export class MenuEffects {
    private readonly actions$ = inject(Actions);
    private readonly appNavigationService = inject(AppNavigationService);

    createProductSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProductsActions.createProductSuccess),
                tap(() => this.appNavigationService.navigateToMenuFeature())
            ),
        { dispatch: false }
    );

    updateProductSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProductsActions.updateProductSuccess),
                tap(() => this.appNavigationService.navigateToMenuFeature())
            ),
        { dispatch: false }
    );

    removeProductSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProductsActions.removeProductSuccess),
                tap(() => this.appNavigationService.navigateToMenuFeature())
            ),
        { dispatch: false }
    );
}
