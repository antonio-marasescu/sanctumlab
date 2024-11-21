import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestLoginPageComponent } from './guest-login-page.component';
import { of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthFeatureName, AuthRoutes } from '../../types/auth-navigation.types';

describe('GuestLoginPageComponent', () => {
    let component: GuestLoginPageComponent;
    let fixture: ComponentFixture<GuestLoginPageComponent>;
    const mockRouter = {
        navigate: jest.fn()
    };
    const mockActivateRoute = {
        queryParams: of({ code: '123' })
    };
    const mockAuthenticationService = {
        loginAsGuest: jest.fn().mockReturnValue(of(true))
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GuestLoginPageComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration(),
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivateRoute },
                {
                    provide: AuthenticationService,
                    useValue: mockAuthenticationService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GuestLoginPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should initialize on ngOnInit subscriptions and forms', fakeAsync(() => {
        const spyActivatedRoute = jest.spyOn(
            mockActivateRoute.queryParams,
            'subscribe'
        );
        expect(component['guestForm']).toBeUndefined();

        fixture.detectChanges();

        expect(component['guestForm']).toBeDefined();
        expect(spyActivatedRoute).toHaveBeenCalledTimes(1);
        tick();
        expect(component['guestForm'].getRawValue()).toEqual({ code: '123' });
    }));

    it('should handle login event', fakeAsync(() => {
        fixture.detectChanges();
        const spyLoginAsGuest = jest.spyOn(
            mockAuthenticationService,
            'loginAsGuest'
        );

        tick();
        component['onLogin']();

        expect(spyLoginAsGuest).toHaveBeenCalledTimes(1);
        expect(spyLoginAsGuest).toHaveBeenCalledWith('123');
    }));

    it('should handle redirect event', fakeAsync(() => {
        fixture.detectChanges();
        const spyRouterNavigate = jest.spyOn(mockRouter, 'navigate');

        tick();
        component['onRedirectToAdminLogin']();

        expect(spyRouterNavigate).toHaveBeenCalledTimes(1);
        expect(spyRouterNavigate).toHaveBeenCalledWith([
            AuthFeatureName,
            AuthRoutes.LOGIN_ADMIN
        ]);
    }));
});
