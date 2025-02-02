import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { provideIcons } from '@ng-icons/core';
import { matWarning } from '@ng-icons/material-icons/baseline';
import { NotificationsListContainerComponent } from './notifications-list-container.component';
import {
    createMockNotification,
    NotificationsApiService
} from '@sanctumlab/fe/data-access';
import { of } from 'rxjs';

describe('NotificationsListContainerComponent', () => {
    let component: NotificationsListContainerComponent;
    let fixture: ComponentFixture<NotificationsListContainerComponent>;
    let mockNotificationsApiService: Partial<NotificationsApiService>;

    beforeEach(waitForAsync(() => {
        mockNotificationsApiService = {
            retrieveNotificationsStream: jest.fn().mockReturnValue(of([])),
            removeNotificationById: jest.fn()
        };

        TestBed.configureTestingModule({
            imports: [NotificationsListContainerComponent],
            providers: [
                provideMockInputValidationConfiguration(),
                provideIcons({
                    matWarning
                }),
                {
                    provide: NotificationsApiService,
                    useValue: mockNotificationsApiService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationsListContainerComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should initialize subscription on ngOnInit', () => {
        const mockStream = of([createMockNotification()]);
        const notificationStreamSpy = jest
            .spyOn(mockNotificationsApiService, 'retrieveNotificationsStream')
            .mockReturnValue(mockStream);
        const subscriptionSpy = jest.spyOn(mockStream, 'subscribe');

        fixture.detectChanges();

        expect(notificationStreamSpy).toHaveBeenCalledTimes(1);
        expect(subscriptionSpy).toHaveBeenCalledTimes(1);
    });

    it('should dispatch remove notification on onRemoveNotification event', () => {
        fixture.detectChanges();
        const notificationRemoveSpy = jest.spyOn(
            mockNotificationsApiService,
            'removeNotificationById'
        );

        const payload = '1234';
        component['onRemoveNotification'](payload);

        expect(notificationRemoveSpy).toHaveBeenCalledTimes(1);
        expect(notificationRemoveSpy).toHaveBeenCalledWith(payload);
    });
});
