import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsActions } from './notifications.actions';
import { delay, map } from 'rxjs';

@Injectable()
export class NotificationsEffects {
    private readonly actions$ = inject(Actions);
    private readonly NotificationRemovalDelay = 4000;

    addNotification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationsActions.addNotification),
            delay(this.NotificationRemovalDelay),
            map(action =>
                NotificationsActions.removeNotification({
                    id: action.notification.id
                })
            )
        )
    );

    addNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationsActions.addNotifications),
            delay(this.NotificationRemovalDelay),
            map(action =>
                NotificationsActions.removeNotifications({
                    ids: action.notifications.map(
                        notification => notification.id
                    )
                })
            )
        )
    );
}
