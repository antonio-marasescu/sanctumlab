import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NotificationDto } from '../../types/notifications.types';

export const NotificationsActions = createActionGroup({
    source: 'Notifications',
    events: {
        AddNotification: props<{ notification: NotificationDto }>(),
        AddNotifications: props<{ notifications: NotificationDto[] }>(),
        RemoveNotification: props<{ id: string }>(),
        RemoveNotifications: props<{ ids: string[] }>(),
        ClearNotifications: emptyProps()
    }
});
