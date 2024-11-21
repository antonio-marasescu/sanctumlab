import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { provideMockStore } from '@ngrx/store/testing';
import { createMockDataAccessInitialState } from '@sanctumlab/fe/data-access';
import {
    AuthenticationService,
    createMockAuthInitialState,
    provideMockAuthConfiguration
} from '@sanctumlab/fe/auth';
import { AuthAvatarComponent } from './auth-avatar.component';
import { AppNavigationService } from '../../services/app-navigation.service';

describe('AuthAvatarComponent', () => {
    let component: AuthAvatarComponent;
    let fixture: ComponentFixture<AuthAvatarComponent>;
    let mockAppNavigationService: Partial<AppNavigationService>;
    let mockAuthService: Partial<AuthenticationService>;

    beforeEach(waitForAsync(() => {
        mockAppNavigationService = {
            navigateToProfileSettings: jest.fn()
        };
        mockAuthService = {
            signOut: jest.fn()
        };
        TestBed.configureTestingModule({
            declarations: [],
            imports: [AuthAvatarComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration(),
                provideMockStore({
                    initialState: {
                        ...createMockDataAccessInitialState(),
                        ...createMockAuthInitialState()
                    }
                }),
                provideMockAuthConfiguration(),
                {
                    provide: AppNavigationService,
                    useValue: mockAppNavigationService
                },
                {
                    provide: AuthenticationService,
                    useValue: mockAuthService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthAvatarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should register username observable on ngOnInit', () => {
        expect(component['username$']).toBeUndefined();

        fixture.detectChanges();

        expect(component['username$']).toBeDefined();
    });

    it('should handle menu click', async () => {
        fixture.detectChanges();

        const signOutSpy = jest.spyOn(mockAuthService, 'signOut');
        await component['onMenuClick']('sign-out');
        expect(signOutSpy).toHaveBeenCalledTimes(1);

        const navigateSettingsSpy = jest.spyOn(
            mockAppNavigationService,
            'navigateToProfileSettings'
        );
        await component['onMenuClick']('settings');
        expect(navigateSettingsSpy).toHaveBeenCalledTimes(1);
    });
});
