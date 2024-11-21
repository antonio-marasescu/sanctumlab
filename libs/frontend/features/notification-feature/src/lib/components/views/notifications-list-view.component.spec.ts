import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { NotificationsListViewComponent } from './notifications-list-view.component';
import { By } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import { matWarning } from '@ng-icons/material-icons/baseline';
import { createMockNotification } from '@sanctumlab/fe/data-access';

describe('NotificationsListViewComponent', () => {
    let component: NotificationsListViewComponent;
    let fixture: ComponentFixture<NotificationsListViewComponent>;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NotificationsListViewComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration(),
                provideIcons({
                    matWarning
                })
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationsListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should initialize a list of notification elements', () => {
        const notifications = [
            createMockNotification({
                id: 'notification-01',
                title: 'Notification 01'
            }),
            createMockNotification({
                id: 'notification-02',
                title: 'Notification 02'
            })
        ];
        fixture.componentRef.setInput('notifications', notifications);

        fixture.detectChanges();

        for (const notification of notifications) {
            const notificationEl = fixture.debugElement.query(
                By.css(`${notification.id}`)
            );
            expect(notificationEl).toBeDefined();
        }
    });
});
