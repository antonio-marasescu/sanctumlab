import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    NotificationsState,
    NotificationsStateFeatureName
} from './notifications.reducers';
import { NotificationDto } from '../../types/notifications.types';

export const selectNotificationsFeatureState = () =>
    createFeatureSelector<NotificationsState>(NotificationsStateFeatureName);

export const selectNotifications = () =>
    createSelector(selectNotificationsFeatureState(), state => {
        return (
            (state.ids.map(id => state.entities[id]) as NotificationDto[]) || []
        );
    });
