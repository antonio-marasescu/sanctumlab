import {
    notificationsInitialState,
    NotificationsState,
    notificationsStateReducer
} from './notifications.reducers';
import { NotificationsActions } from './notifications.actions';
import { createMockNotification } from '../../types/_mocks/notifications.types.mocks';

describe('NotificationsReducer', () => {
    it('should return the default state for unknown action', () => {
        const initialState = notificationsInitialState;
        const action = {
            type: 'Unknown'
        };
        const state = notificationsStateReducer(initialState, action);

        expect(state).toBe(initialState);
    });

    it('should add one notification and update the state in an immutable way', () => {
        const payload = createMockNotification();
        const action = NotificationsActions.addNotification({
            notification: payload
        });
        const expectedState: NotificationsState = {
            ...notificationsInitialState,
            entities: { [payload.id]: payload },
            ids: [payload.id]
        };
        const state = notificationsStateReducer(
            notificationsInitialState,
            action
        );

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(notificationsInitialState);
    });

    it('should add multiple notifications and update the state in an immutable way', () => {
        const payload = createMockNotification();
        const action = NotificationsActions.addNotifications({
            notifications: [payload]
        });
        const expectedState: NotificationsState = {
            ...notificationsInitialState,
            entities: { [payload.id]: payload },
            ids: [payload.id]
        };
        const state = notificationsStateReducer(
            notificationsInitialState,
            action
        );

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(notificationsInitialState);
    });

    it('should remove notification by id and update the state in an immutable way', () => {
        const payloadOne = createMockNotification({ id: '1' });
        const payloadTwo = createMockNotification({ id: '2' });
        const initialState: NotificationsState = {
            ...notificationsInitialState,
            entities: {
                [payloadOne.id]: payloadOne,
                [payloadTwo.id]: payloadTwo
            },
            ids: [payloadOne.id, payloadTwo.id]
        };
        const action = NotificationsActions.removeNotification({
            id: payloadOne.id
        });
        const expectedState = {
            ...notificationsInitialState,
            entities: { [payloadTwo.id]: payloadTwo },
            ids: [payloadTwo.id]
        };

        const state = notificationsStateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(notificationsInitialState);
    });

    it('should remove multiple notifications by id and update the state in an immutable way', () => {
        const payloadOne = createMockNotification({ id: '1' });
        const payloadTwo = createMockNotification({ id: '2' });
        const initialState: NotificationsState = {
            ...notificationsInitialState,
            entities: {
                [payloadOne.id]: payloadOne,
                [payloadTwo.id]: payloadTwo
            },
            ids: [payloadOne.id, payloadTwo.id]
        };
        const action = NotificationsActions.removeNotifications({
            ids: [payloadOne.id]
        });
        const expectedState = {
            ...notificationsInitialState,
            entities: { [payloadTwo.id]: payloadTwo },
            ids: [payloadTwo.id]
        };

        const state = notificationsStateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(notificationsInitialState);
    });

    it('should clear notifications and update the state in an immutable way', () => {
        const payloadOne = createMockNotification({ id: '1' });
        const payloadTwo = createMockNotification({ id: '2' });
        const initialState: NotificationsState = {
            ...notificationsInitialState,
            entities: {
                [payloadOne.id]: payloadOne,
                [payloadTwo.id]: payloadTwo
            },
            ids: [payloadOne.id, payloadTwo.id]
        };
        const action = NotificationsActions.clearNotifications();
        const expectedState = {
            ...notificationsInitialState
        };

        const state = notificationsStateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(notificationsInitialState);
    });
});
