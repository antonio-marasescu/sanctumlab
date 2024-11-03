import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationDto } from '../types/notifications.types';
import { selectNotifications } from '../state/notifications/notifications.selectors';
import { NotificationsActions } from '../state/notifications/notifications.actions';

@Injectable({ providedIn: 'root' })
export class NotificationsApiService {
    private readonly store = inject(Store);

    public retrieveNotificationsStream(): Observable<NotificationDto[]> {
        return this.store.select(selectNotifications());
    }

    public setNotifications(notifications: NotificationDto[]): void {
        this.store.dispatch(
            NotificationsActions.addNotifications({ notifications })
        );
    }

    public removeNotificationById(id: string): void {
        this.store.dispatch(NotificationsActions.removeNotification({ id }));
    }

    public clearNotifications(): void {
        this.store.dispatch(NotificationsActions.clearNotifications());
    }
}
