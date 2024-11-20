import { TestBed } from '@angular/core/testing';
import { NotificationsApiService } from './notifications-api.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createMockDataAccessInitialState } from '../state/_mocks/state.mocks';
import { cold } from 'jest-marbles';
import { NotificationDto } from '../types/notifications.types';
import { createMockNotification } from '../types/_mocks/notifications.types.mocks';
import { NotificationsActions } from '../state/notifications/notifications.actions';
import { NotificationsSelectors } from '../state/notifications/notifications.selectors';

describe('NotificationsApiService', () => {
    const initialState = createMockDataAccessInitialState();
    let service: NotificationsApiService;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState
                }),
                NotificationsApiService
            ]
        });
        service = TestBed.inject(NotificationsApiService);
        store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve notifications stream', () => {
        const expectedNotifications: NotificationDto[] = [
            createMockNotification({ id: '1234' })
        ];

        const mockSelect = NotificationsSelectors.selectNotifications();
        jest.spyOn(
            NotificationsSelectors,
            'selectNotifications'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedNotifications);
        store.refreshState();

        const expected = cold('(a)', { a: expectedNotifications });
        expect(service.retrieveNotificationsStream()).toBeObservable(expected);
    });

    it('should dispatch set notifications', () => {
        const expectedNotifications: NotificationDto[] = [
            createMockNotification({ id: '1234' })
        ];
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue();
        service.setNotifications(expectedNotifications);
        expect(dispatchSpy).toHaveBeenCalledWith(
            NotificationsActions.addNotifications({
                notifications: expectedNotifications
            })
        );
    });

    it('should dispatch remove notifications', () => {
        const expectedId = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue();
        service.removeNotificationById(expectedId);
        expect(dispatchSpy).toHaveBeenCalledWith(
            NotificationsActions.removeNotification({
                id: expectedId
            })
        );
    });

    it('should dispatch clear notifications', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue();
        service.clearNotifications();
        expect(dispatchSpy).toHaveBeenCalledWith(
            NotificationsActions.clearNotifications()
        );
    });
});
