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
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthFeatureName, AuthRoutes } from '../../types/auth-navigation.types';
import { AdminLoginPageComponent } from './admin-login-page.component';

describe('AdminLoginPageComponent', () => {
    let component: AdminLoginPageComponent;
    let fixture: ComponentFixture<AdminLoginPageComponent>;
    const mockRouter = {
        navigate: jest.fn()
    };
    const mockAuthenticationService = {
        login: jest.fn().mockReturnValue(of(true))
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AdminLoginPageComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration(),
                { provide: Router, useValue: mockRouter },
                {
                    provide: AuthenticationService,
                    useValue: mockAuthenticationService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminLoginPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should initialize on ngOnInit form', () => {
        expect(component['adminForm']).toBeUndefined();

        fixture.detectChanges();

        expect(component['adminForm']).toBeDefined();
    });

    it('should handle login event', fakeAsync(() => {
        fixture.detectChanges();
        const spyLoginAsGuest = jest.spyOn(mockAuthenticationService, 'login');

        component['adminForm'].patchValue({
            username: 'test@email.com',
            password: '123456'
        });
        tick();
        component['onLogin']();

        expect(spyLoginAsGuest).toHaveBeenCalledTimes(1);
        expect(spyLoginAsGuest).toHaveBeenCalledWith(
            'test@email.com',
            '123456'
        );
    }));

    it('should handle redirect event', fakeAsync(() => {
        fixture.detectChanges();
        const spyRouterNavigate = jest.spyOn(mockRouter, 'navigate');

        tick();
        component['onRedirectToGuestLogin']();

        expect(spyRouterNavigate).toHaveBeenCalledTimes(1);
        expect(spyRouterNavigate).toHaveBeenCalledWith([
            AuthFeatureName,
            AuthRoutes.LOGIN
        ]);
    }));
});
