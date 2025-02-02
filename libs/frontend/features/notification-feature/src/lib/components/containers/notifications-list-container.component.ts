import {
    ChangeDetectionStrategy,
    Component,
    EnvironmentInjector,
    OnInit,
    Signal
} from '@angular/core';
import {
    NotificationDto,
    NotificationsApiService
} from '@sanctumlab/fe/data-access';
import { NotificationsListViewComponent } from '../views/notifications-list-view.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ngx-notifications-list-container',
    imports: [NotificationsListViewComponent],
    template: `<ngx-notifications-list-view
        [notifications]="notifications()"
        (notificationClose)="onRemoveNotification($event)"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsListContainerComponent implements OnInit {
    protected notifications!: Signal<NotificationDto[]>;

    constructor(
        private readonly notificationsApiService: NotificationsApiService,
        private readonly injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.notifications = toSignal(
            this.notificationsApiService.retrieveNotificationsStream(),
            { injector: this.injector, initialValue: [] }
        );
    }

    protected onRemoveNotification(id: string): void {
        this.notificationsApiService.removeNotificationById(id);
    }
}
