import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChildren
} from '@angular/core';
import { NotificationDto } from '@sanctumlab/fe/data-access';
import { NotificationComponent } from '@sanctumlab/fe/component-library';

@Component({
    selector: 'ngx-notifications-list-view',
    imports: [NotificationComponent],
    template: `@if (notifications && notifications.length > 0) {
        <div
            class="absolute top-0 right-0 w-40 sm:w-64 lg:w-96 flex flex-col gap-2 z-50"
        >
            @for (notification of notifications; track notification.id) {
                <ngx-clib-notification
                    #notificationElement
                    tabindex="-1"
                    [id]="notification.id"
                    [label]="'notification:titles.' + notification.title"
                    icon="matWarning"
                    [theme]="notification.type"
                    [description]="'notification:errors.' + notification.code"
                    (closeEvent)="notificationClose.emit($event)"
                />
            }
        </div>
    }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsListViewComponent implements AfterViewChecked {
    @Input({ required: true }) notifications: NotificationDto[] | null = [];
    @Output() notificationClose = new EventEmitter<string>();

    @ViewChildren('notificationElement', { read: ElementRef })
    protected notificationElements!: QueryList<ElementRef>;

    ngAfterViewChecked(): void {
        if (this.notifications && this.notifications.length > 0) {
            const lastNotification = this.notificationElements.last;
            if (lastNotification) {
                lastNotification.nativeElement.focus();
            }
        }
    }
}
