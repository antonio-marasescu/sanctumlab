import { createMockDataAccessInitialState } from '../_mocks/state.mocks';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { IngredientsEffects } from './ingredients.effects';
import { IngredientsActions } from './ingredients.actions';
import {
    createMockCreateIngredientDto,
    createMockForbiddenException,
    createMockInvalidPayloadException,
    createMockIngredientDto,
    createMockUpdateIngredientDto
} from '@sanctumlab/api-interfaces';
import { hot } from 'jest-marbles';
import { RecipesClientService } from '../../clients/recipes-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsActions } from '../notifications/notifications.actions';
import { createNotificationHttpError } from '../../utils/notifications.utils';

describe('IngredientsEffects', () => {
    const initialState = createMockDataAccessInitialState();
    let actions$ = new Observable<Action>();
    let effects: IngredientsEffects;
    let clientServiceMock: Partial<RecipesClientService>;

    beforeEach(() => {
        clientServiceMock = {
            createIngredient: jest.fn(),
            updateIngredient: jest.fn(),
            removeIngredientById: jest.fn(),
            retrieveIngredientById: jest.fn(),
            retrieveIngredients: jest.fn()
        } as unknown as RecipesClientService;
        actions$ = new Observable<Action>();

        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState
                }),
                provideMockActions(() => actions$),
                IngredientsEffects,
                {
                    provide: RecipesClientService,
                    useValue: clientServiceMock
                }
            ]
        });
        effects = TestBed.inject(IngredientsEffects);
    });

    describe('createIngredient$', () => {
        it('should emit create ingredient success after create ingredient', () => {
            const payloadCreate = createMockCreateIngredientDto();
            const payloadSuccess = createMockIngredientDto();
            jest.spyOn(clientServiceMock, 'createIngredient').mockReturnValue(
                of(payloadSuccess)
            );

            actions$ = hot('-a', {
                a: IngredientsActions.createIngredient({
                    ingredient: payloadCreate
                })
            });
            const expected = hot('-b', {
                b: IngredientsActions.createIngredientSuccess({
                    ingredient: payloadSuccess
                })
            });

            expect(effects.createIngredient$).toBeObservable(expected);
        });

        it('should emit error actions after create ingredient invalid payload', () => {
            const payloadCreate = createMockCreateIngredientDto();
            const payloadError = createMockInvalidPayloadException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(clientServiceMock, 'createIngredient').mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: IngredientsActions.createIngredient({
                    ingredient: payloadCreate
                })
            });
            const expected = hot('-(bc)', {
                b: IngredientsActions.ingredientFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'INGREDIENT_CREATE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.createIngredient$).toBeObservable(expected);
        });
    });

    describe('updateIngredient$', () => {
        it('should emit update ingredient success after update ingredient', () => {
            const payloadId = '1234';
            const payloadUpdate = createMockUpdateIngredientDto();
            const payloadSuccess = createMockIngredientDto({ id: payloadId });
            jest.spyOn(clientServiceMock, 'updateIngredient').mockReturnValue(
                of(payloadSuccess)
            );

            actions$ = hot('-a', {
                a: IngredientsActions.updateIngredient({
                    id: payloadId,
                    ingredient: payloadUpdate
                })
            });
            const expected = hot('-b', {
                b: IngredientsActions.updateIngredientSuccess({
                    ingredient: payloadSuccess
                })
            });

            expect(effects.updateIngredient$).toBeObservable(expected);
        });

        it('should emit error actions after update ingredient invalid payload', () => {
            const payloadId = '1234';
            const payloadUpdate = createMockUpdateIngredientDto();
            const payloadError = createMockInvalidPayloadException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(clientServiceMock, 'updateIngredient').mockReturnValue(
                throwError(() => payloadHttpError)
            );

            actions$ = hot('-a', {
                a: IngredientsActions.updateIngredient({
                    id: payloadId,
                    ingredient: payloadUpdate
                })
            });
            const expected = hot('-(bc)', {
                b: IngredientsActions.ingredientFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'INGREDIENT_UPDATE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.updateIngredient$).toBeObservable(expected);
        });
    });

    describe('removeIngredient$', () => {
        it('should emit remove ingredient success after remove ingredient', () => {
            const payloadId = '1234';
            jest.spyOn(
                clientServiceMock,
                'removeIngredientById'
            ).mockReturnValue(of(null) as any);

            actions$ = hot('-a', {
                a: IngredientsActions.removeIngredient({
                    id: payloadId
                })
            });
            const expected = hot('-b', {
                b: IngredientsActions.removeIngredientSuccess({
                    id: payloadId
                })
            });

            expect(effects.removeIngredient$).toBeObservable(expected);
        });

        it('should emit error actions after remove ingredient forbidden exception', () => {
            const payloadId = '1234';
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(
                clientServiceMock,
                'removeIngredientById'
            ).mockReturnValue(throwError(() => payloadHttpError));

            actions$ = hot('-a', {
                a: IngredientsActions.removeIngredient({
                    id: payloadId
                })
            });
            const expected = hot('-(bc)', {
                b: IngredientsActions.ingredientFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'INGREDIENT_REMOVE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.removeIngredient$).toBeObservable(expected);
        });
    });

    describe('getIngredientList$', () => {
        it('should emit get ingredient list success after get ingredient list', () => {
            const payloadSuccess = createMockIngredientDto();
            jest.spyOn(
                clientServiceMock,
                'retrieveIngredients'
            ).mockReturnValue(of([payloadSuccess]));

            actions$ = hot('-a', {
                a: IngredientsActions.getIngredientList()
            });
            const expected = hot('-b', {
                b: IngredientsActions.getIngredientListSuccess({
                    ingredients: [payloadSuccess]
                })
            });

            expect(effects.getIngredientList$).toBeObservable(expected);
        });

        it('should emit error actions after get ingredient list forbidden exception', () => {
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(
                clientServiceMock,
                'retrieveIngredients'
            ).mockReturnValue(throwError(() => payloadHttpError));

            actions$ = hot('-a', {
                a: IngredientsActions.getIngredientList()
            });
            const expected = hot('-(bc)', {
                b: IngredientsActions.ingredientFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'INGREDIENT_RETRIEVE_ALL_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.getIngredientList$).toBeObservable(expected);
        });
    });

    describe('getIngredientById$', () => {
        it('should emit get ingredient by id success after get ingredient by id', () => {
            const payloadId = '1234';
            const payloadSuccess = createMockIngredientDto({ id: payloadId });
            jest.spyOn(
                clientServiceMock,
                'retrieveIngredientById'
            ).mockReturnValue(of(payloadSuccess));

            actions$ = hot('-a', {
                a: IngredientsActions.getIngredientById({ id: payloadId })
            });
            const expected = hot('-b', {
                b: IngredientsActions.getIngredientByIdSuccess({
                    ingredient: payloadSuccess
                })
            });

            expect(effects.getIngredientById$).toBeObservable(expected);
        });

        it('should emit error actions after get ingredient by id forbidden exception', () => {
            const payloadId = '1234';
            const payloadError = createMockForbiddenException();
            const payloadHttpError = new HttpErrorResponse({
                error: payloadError
            });
            jest.spyOn(
                clientServiceMock,
                'retrieveIngredientById'
            ).mockReturnValue(throwError(() => payloadHttpError));

            actions$ = hot('-a', {
                a: IngredientsActions.getIngredientById({ id: payloadId })
            });
            const expected = hot('-(bc)', {
                b: IngredientsActions.ingredientFailure({
                    reason: payloadHttpError.message
                }),
                c: NotificationsActions.addNotification({
                    notification: createNotificationHttpError(
                        'INGREDIENT_RETRIEVE_FAILURE',
                        payloadHttpError
                    )
                })
            });

            expect(effects.getIngredientById$).toBeObservable(expected);
        });
    });
});
