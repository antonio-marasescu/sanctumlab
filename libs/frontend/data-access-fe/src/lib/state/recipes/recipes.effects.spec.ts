import { createMockDataAccessInitialState } from '../_mocks/state.mocks';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RecipesEffects } from './recipes.effects';
import { RecipesActions } from './recipes.actions';
import {
    createMockCreateRecipeDto,
    createMockForbiddenException,
    createMockInvalidPayloadException,
    createMockRecipeDto,
    createMockUpdateRecipeDto
} from '@sanctumlab/api-interfaces';
import { hot } from 'jest-marbles';
import { RecipesClientService } from '../../clients/recipes-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsActions } from '../notifications/notifications.actions';
import { createNotificationHttpError } from '../../utils/notifications.utils';

describe('RecipesEffects', () => {
    const initialState = createMockDataAccessInitialState();
    let actions$ = new Observable<Action>();
    let effects: RecipesEffects;
    let clientServiceMock: Partial<RecipesClientService>;

    beforeEach(() => {
        clientServiceMock = {
            createRecipe: jest.fn(),
            updateRecipe: jest.fn(),
            removeRecipeById: jest.fn(),
            retrieveRecipeById: jest.fn(),
            retrieveRecipes: jest.fn()
        } as unknown as RecipesClientService;
        actions$ = new Observable<Action>();

        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState
                }),
                provideMockActions(() => actions$),
                RecipesEffects,
                {
                    provide: RecipesClientService,
                    useValue: clientServiceMock
                }
            ]
        });
        effects = TestBed.inject(RecipesEffects);
    });

    describe('createRecipe$', () => {
        it('should emit create recipe success after create recipe', () => {
            const payloadCreate = createMockCreateRecipeDto();
            const payloadSuccess = createMockRecipeDto();
            jest.spyOn(clientServiceMock, 'createRecipe').mockReturnValue(
                of(payloadSuccess)
            );

            actions$ = hot('-a', {
                a: RecipesActions.createRecipe({
                    recipe: payloadCreate
                })
            });
            const expected = hot('-b', {
                b: RecipesActions.createRecipeSuccess({
                    recipe: payloadSuccess
                })
            });

            expect(effects.createRecipe$).toBeObservable(expected);
        });

        it('should emit error actions after create recipe invalid payload', () => {
            const payloadCreate = createMockCreateRecipeDto();
            const payloadError = createMockInvalidPayloadException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(clientServiceMock, 'createRecipe').mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: RecipesActions.createRecipe({
                    recipe: payloadCreate
                })
            });
            const expected = hot('-(bc)', {
                b: RecipesActions.recipeFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'RECIPE_CREATE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.createRecipe$).toBeObservable(expected);
        });
    });

    describe('updateRecipe$', () => {
        it('should emit update recipe success after update recipe', () => {
            const payloadId = '1234';
            const payloadUpdate = createMockUpdateRecipeDto();
            const payloadSuccess = createMockRecipeDto({ id: payloadId });
            jest.spyOn(clientServiceMock, 'updateRecipe').mockReturnValue(
                of(payloadSuccess)
            );

            actions$ = hot('-a', {
                a: RecipesActions.updateRecipe({
                    id: payloadId,
                    recipe: payloadUpdate
                })
            });
            const expected = hot('-b', {
                b: RecipesActions.updateRecipeSuccess({
                    recipe: payloadSuccess
                })
            });

            expect(effects.updateRecipe$).toBeObservable(expected);
        });

        it('should emit error actions after update recipe invalid payload', () => {
            const payloadId = '1234';
            const payloadUpdate = createMockUpdateRecipeDto();
            const payloadError = createMockInvalidPayloadException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(clientServiceMock, 'updateRecipe').mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: RecipesActions.updateRecipe({
                    id: payloadId,
                    recipe: payloadUpdate
                })
            });
            const expected = hot('-(bc)', {
                b: RecipesActions.recipeFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'RECIPE_UPDATE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.updateRecipe$).toBeObservable(expected);
        });
    });

    describe('removeRecipe$', () => {
        it('should emit remove recipe success after remove recipe', () => {
            const payloadId = '1234';
            jest.spyOn(clientServiceMock, 'removeRecipeById').mockReturnValue(
                of(null) as any
            );

            actions$ = hot('-a', {
                a: RecipesActions.removeRecipe({
                    id: payloadId
                })
            });
            const expected = hot('-b', {
                b: RecipesActions.removeRecipeSuccess({
                    id: payloadId
                })
            });

            expect(effects.removeRecipe$).toBeObservable(expected);
        });

        it('should emit error actions after remove recipe forbidden exception', () => {
            const payloadId = '1234';
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(clientServiceMock, 'removeRecipeById').mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: RecipesActions.removeRecipe({
                    id: payloadId
                })
            });
            const expected = hot('-(bc)', {
                b: RecipesActions.recipeFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'RECIPE_REMOVE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.removeRecipe$).toBeObservable(expected);
        });
    });

    describe('getRecipeList$', () => {
        it('should emit get recipe list success after get recipe list', () => {
            const payloadSuccess = createMockRecipeDto();
            jest.spyOn(clientServiceMock, 'retrieveRecipes').mockReturnValue(
                of([payloadSuccess])
            );

            actions$ = hot('-a', {
                a: RecipesActions.getRecipeList()
            });
            const expected = hot('-b', {
                b: RecipesActions.getRecipeListSuccess({
                    recipes: [payloadSuccess]
                })
            });

            expect(effects.getRecipeList$).toBeObservable(expected);
        });

        it('should emit error actions after get recipe list forbidden exception', () => {
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(clientServiceMock, 'retrieveRecipes').mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: RecipesActions.getRecipeList()
            });
            const expected = hot('-(bc)', {
                b: RecipesActions.recipeFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'RECIPE_RETRIEVE_ALL_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.getRecipeList$).toBeObservable(expected);
        });
    });

    describe('getRecipeById$', () => {
        it('should emit get recipe by id success after get recipe by id', () => {
            const payloadId = '1234';
            const payloadSuccess = createMockRecipeDto({ id: payloadId });
            jest.spyOn(clientServiceMock, 'retrieveRecipeById').mockReturnValue(
                of(payloadSuccess)
            );

            actions$ = hot('-a', {
                a: RecipesActions.getRecipeById({ id: payloadId })
            });
            const expected = hot('-b', {
                b: RecipesActions.getRecipeByIdSuccess({
                    recipe: payloadSuccess
                })
            });

            expect(effects.getRecipeById$).toBeObservable(expected);
        });

        it('should emit error actions after get recipe by id forbidden exception', () => {
            const payloadId = '1234';
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(clientServiceMock, 'retrieveRecipeById').mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: RecipesActions.getRecipeById({ id: payloadId })
            });
            const expected = hot('-(bc)', {
                b: RecipesActions.recipeFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'RECIPE_RETRIEVE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.getRecipeById$).toBeObservable(expected);
        });
    });
});
