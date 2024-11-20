import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { createMockDataAccessInitialState } from '../_mocks/state.mocks';
import { NotificationsEffects } from './notifications.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationsActions } from './notifications.actions';
import { createMockNotification } from '../../types/_mocks/notifications.types.mocks';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

describe('NotificationsEffects', () => {
    const initialState = createMockDataAccessInitialState();
    let actions$ = new Observable<Action>();
    let effects: NotificationsEffects;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        actions$ = new Observable<Action>();
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState
                }),
                provideMockActions(() => actions$),
                NotificationsEffects
            ]
        });
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
        effects = TestBed.inject(NotificationsEffects);
    });

    it('should remove notification after delay from add notification', () => {
        testScheduler.run(({ hot, expectObservable }) => {
            const payload = createMockNotification();
            actions$ = hot('a', {
                a: NotificationsActions.addNotification({
                    notification: payload
                })
            });
            const expectedMarble = '4s b';
            const expectedValues = {
                b: NotificationsActions.removeNotification({ id: payload.id })
            };
            expectObservable(effects.addNotification$).toBe(
                expectedMarble,
                expectedValues
            );
        });
    });

    it('should remove multiple notifications after delay from add notifications', () => {
        testScheduler.run(({ hot, expectObservable }) => {
            const payload = createMockNotification();
            actions$ = hot('a', {
                a: NotificationsActions.addNotifications({
                    notifications: [payload]
                })
            });
            const expectedMarble = '4s b';
            const expectedValues = {
                b: NotificationsActions.removeNotifications({
                    ids: [payload.id]
                })
            };
            expectObservable(effects.addNotifications$).toBe(
                expectedMarble,
                expectedValues
            );
        });
    });
});
