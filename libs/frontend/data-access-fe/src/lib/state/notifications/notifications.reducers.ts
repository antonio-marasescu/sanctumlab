import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NotificationDto } from '../../types/notifications.types';
import { createReducer, on } from '@ngrx/store';
import { NotificationsActions } from './notifications.actions';

export const NotificationsStateFeatureName = 'notifications';

export type NotificationsState = EntityState<NotificationDto>;

export const notificationsStateAdapter: EntityAdapter<NotificationDto> =
    createEntityAdapter<NotificationDto>({
        selectId: item => item.id
    });

export const notificationsInitialState: NotificationsState =
    notificationsStateAdapter.getInitialState();

export const notificationsStateReducer = createReducer(
    notificationsInitialState,
    on(NotificationsActions.addNotification, (state, { notification }) => {
        return notificationsStateAdapter.addOne(notification, { ...state });
    }),
    on(NotificationsActions.addNotifications, (state, { notifications }) => {
        return notificationsStateAdapter.addMany(notifications, { ...state });
    }),
    on(NotificationsActions.removeNotification, (state, { id }) => {
        return notificationsStateAdapter.removeOne(id, { ...state });
    }),
    on(NotificationsActions.removeNotifications, (state, { ids }) => {
        return notificationsStateAdapter.removeMany(ids, { ...state });
    }),
    on(NotificationsActions.clearNotifications, state => {
        return notificationsStateAdapter.removeAll({ ...state });
    })
);
