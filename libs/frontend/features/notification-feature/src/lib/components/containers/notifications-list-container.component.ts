import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    NotificationDto,
    NotificationsApiService
} from '@sanctumlab/fe/data-access';
import { Observable } from 'rxjs';
import { NotificationsListViewComponent } from '../views/notifications-list-view.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ngx-notifications-list-container',
    standalone: true,
    imports: [NotificationsListViewComponent, AsyncPipe],
    template: `<ngx-notifications-list-view
        [notifications]="notifications$ | async"
        (notificationClose)="onRemoveNotification($event)"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsListContainerComponent implements OnInit {
    protected notifications$!: Observable<NotificationDto[]>;

    constructor(
        private readonly notificationsApiService: NotificationsApiService
    ) {}

    ngOnInit() {
        this.notifications$ =
            this.notificationsApiService.retrieveNotificationsStream();
    }

    protected onRemoveNotification(id: string): void {
        this.notificationsApiService.removeNotificationById(id);
    }
}
