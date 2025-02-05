import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    input,
    output,
    viewChildren
} from '@angular/core';
import { NotificationDto } from '@sanctumlab/fe/data-access';
import { NotificationComponent } from '@sanctumlab/fe/component-library';

@Component({
    selector: 'ngx-notifications-list-view',
    imports: [NotificationComponent],
    template: ` @let notificationsData = notifications();
        @if (notificationsData && notificationsData.length > 0) {
            <div
                class="absolute top-0 right-0 w-40 sm:w-64 lg:w-96 flex flex-col gap-2 z-50"
            >
                @for (notification of notifications(); track notification.id) {
                    <ngx-clib-notification
                        #notificationElement
                        tabindex="-1"
                        [id]="notification.id"
                        [label]="'notification:titles.' + notification.title"
                        icon="matWarning"
                        [theme]="notification.type"
                        [description]="
                            'notification:errors.' + notification.code
                        "
                        (closeEvent)="notificationClose.emit($event)"
                    />
                }
            </div>
        }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsListViewComponent implements AfterViewChecked {
    public notifications = input<NotificationDto[] | null>([]);
    public notificationClose = output<string>();
    protected notificationElements = viewChildren('notificationElement', {
        read: ElementRef
    });

    ngAfterViewChecked(): void {
        const notificationsDtoList = this.notifications();
        if (notificationsDtoList && notificationsDtoList?.length > 0) {
            const notificationsRef = this.notificationElements();
            const lastNotification =
                notificationsRef[notificationsRef.length - 1];
            if (lastNotification) {
                lastNotification.nativeElement.focus();
            }
        }
    }
}
