import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesClientService } from '../../clients/recipes-client.service';
import { RecipesActions } from './recipes.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsActions } from '../notifications/notifications.actions';
import { createNotificationHttpError } from '../../utils/notifications.utils';

@Injectable()
export class RecipesEffects {
    private readonly actions$ = inject(Actions);
    private readonly client = inject(RecipesClientService);

    createRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.createRecipe),
            exhaustMap(action =>
                this.client.createRecipe(action.recipe).pipe(
                    map(recipe =>
                        RecipesActions.createRecipeSuccess({
                            recipe
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        RecipesActions.recipeFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'RECIPE_CREATE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    updateRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.updateRecipe),
            exhaustMap(action =>
                this.client.updateRecipe(action.id, action.recipe).pipe(
                    map(recipe =>
                        RecipesActions.updateRecipeSuccess({
                            recipe
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        RecipesActions.recipeFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'RECIPE_UPDATE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    removeRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.removeRecipe),
            exhaustMap(action =>
                this.client.removeRecipeById(action.id).pipe(
                    map(() =>
                        RecipesActions.removeRecipeSuccess({
                            id: action.id
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        RecipesActions.recipeFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'RECIPE_REMOVE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    getRecipeList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.getRecipeList),
            exhaustMap(() =>
                this.client.retrieveRecipes().pipe(
                    map(recipes =>
                        RecipesActions.getRecipeListSuccess({
                            recipes
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        RecipesActions.recipeFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'RECIPE_RETRIEVE_ALL_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );

    getRecipeById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.getRecipeById),
            exhaustMap(action =>
                this.client.retrieveRecipeById(action.id).pipe(
                    map(recipe =>
                        RecipesActions.getRecipeByIdSuccess({
                            recipe
                        })
                    ),
                    catchError((error: HttpErrorResponse) => [
                        RecipesActions.recipeFailure({
                            reason: error.message
                        }),
                        NotificationsActions.addNotification({
                            notification: createNotificationHttpError(
                                'RECIPE_RETRIEVE_FAILURE',
                                error
                            )
                        })
                    ])
                )
            )
        )
    );
}
