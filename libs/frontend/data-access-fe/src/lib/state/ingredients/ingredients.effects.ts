import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesClientService } from '../../clients/recipes-client.service';
import { IngredientsActions } from './ingredients.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsActions } from '../notifications/notifications.actions';
import { createNotificationHttpError } from '../../utils/notifications.utils';

@Injectable()
export class IngredientsEffects {
    private readonly actions$ = inject(Actions);
    private readonly client = inject(RecipesClientService);

    createIngredient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngredientsActions.createIngredient),
            exhaustMap(action =>
                this.client.createIngredient(action.ingredient).pipe(
                    map(ingredient =>
                        IngredientsActions.createIngredientSuccess({
                            ingredient
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        IngredientsActions.ingredientFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'INGREDIENT_CREATE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    updateIngredient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngredientsActions.updateIngredient),
            exhaustMap(action =>
                this.client.updateIngredient(action.id, action.ingredient).pipe(
                    map(ingredient =>
                        IngredientsActions.updateIngredientSuccess({
                            ingredient
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        IngredientsActions.ingredientFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'INGREDIENT_UPDATE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    removeIngredient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngredientsActions.removeIngredient),
            exhaustMap(action =>
                this.client.removeIngredientById(action.id).pipe(
                    map(() =>
                        IngredientsActions.removeIngredientSuccess({
                            id: action.id
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        IngredientsActions.ingredientFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'INGREDIENT_REMOVE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    getIngredientList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngredientsActions.getIngredientList),
            exhaustMap(() =>
                this.client.retrieveIngredients().pipe(
                    map(ingredients =>
                        IngredientsActions.getIngredientListSuccess({
                            ingredients
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        IngredientsActions.ingredientFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'INGREDIENT_RETRIEVE_ALL_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    getIngredientById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngredientsActions.getIngredientById),
            exhaustMap(action =>
                this.client.retrieveIngredientById(action.id).pipe(
                    map(ingredient =>
                        IngredientsActions.getIngredientByIdSuccess({
                            ingredient
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        IngredientsActions.ingredientFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'INGREDIENT_RETRIEVE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );
}
