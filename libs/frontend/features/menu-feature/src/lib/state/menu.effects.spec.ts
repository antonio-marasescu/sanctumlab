import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { createMockProductItemDto } from '@sanctumlab/api-interfaces';
import { AppNavigationService } from '@sanctumlab/fe/shared';
import { MenuEffects } from './menu.effects';
import { createMockAuthInitialState } from '@sanctumlab/fe/auth';
import {
    createMockDataAccessInitialState,
    ProductsActions
} from '@sanctumlab/fe/data-access';

describe('MenuEffects', () => {
    let actions$ = new Observable<Action>();
    let mockAppNavigation: Partial<AppNavigationService>;
    let effects: MenuEffects;

    beforeEach(() => {
        actions$ = new Observable<Action>();
        mockAppNavigation = {
            navigateToMenuFeature: jest.fn()
        };
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState: {
                        ...createMockDataAccessInitialState(),
                        ...createMockAuthInitialState()
                    }
                }),
                provideMockActions(() => actions$),
                MenuEffects,
                {
                    provide: AppNavigationService,
                    useValue: mockAppNavigation
                }
            ]
        });
        effects = TestBed.inject(MenuEffects);
    });

    it('should navigate to root feature on createProductSuccess', done => {
        const navigateToMenuFeatureSpy = jest.spyOn(
            mockAppNavigation,
            'navigateToMenuFeature'
        );
        actions$ = of(
            ProductsActions.createProductSuccess({
                product: createMockProductItemDto()
            })
        );

        effects.createProductSuccess$.subscribe(() => {
            expect(navigateToMenuFeatureSpy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should navigate to root feature on updateProductSuccess', done => {
        const navigateToMenuFeatureSpy = jest.spyOn(
            mockAppNavigation,
            'navigateToMenuFeature'
        );
        actions$ = of(
            ProductsActions.updateProductSuccess({
                product: createMockProductItemDto()
            })
        );

        effects.updateProductSuccess$.subscribe(() => {
            expect(navigateToMenuFeatureSpy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should navigate to root feature on removeProductSuccess', done => {
        const navigateToMenuFeatureSpy = jest.spyOn(
            mockAppNavigation,
            'navigateToMenuFeature'
        );
        actions$ = of(
            ProductsActions.removeProductSuccess({
                id: '1234'
            })
        );

        effects.removeProductSuccess$.subscribe(() => {
            expect(navigateToMenuFeatureSpy).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
