import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthFeatureName, AuthRoutes } from '../types/auth-navigation.types';
import { authenticatedGuard } from './authenticated.guard';

describe('authenticatedGuard', () => {
    let mockAuthService: {
        isAuthenticated: jest.Mock;
    };
    let mockRouter: {
        navigate: jest.Mock;
    };
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;

    beforeEach(() => {
        mockAuthService = {
            isAuthenticated: jest.fn()
        };
        mockRouter = {
            navigate: jest.fn()
        };
        mockActivatedRouteSnapshot = new ActivatedRouteSnapshot();

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthenticationService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter }
            ]
        });
    });

    it('should allow navigation if user is authenticated', async () => {
        jest.spyOn(mockAuthService, 'isAuthenticated').mockReturnValue(
            Promise.resolve(true)
        );

        const result = await TestBed.runInInjectionContext(() =>
            authenticatedGuard(mockActivatedRouteSnapshot)
        );

        expect(result).toBe(true);
    });

    it('should not allow navigation if user is not authenticated', async () => {
        jest.spyOn(mockAuthService, 'isAuthenticated').mockReturnValue(
            Promise.resolve(false)
        );

        const result = await TestBed.runInInjectionContext(() =>
            authenticatedGuard(mockActivatedRouteSnapshot)
        );

        expect(result).toBe(false);
    });

    it('should redirect user to login page if user is not authenticated', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');

        mockActivatedRouteSnapshot.queryParams = { code: '123' };
        await TestBed.runInInjectionContext(() =>
            authenticatedGuard(mockActivatedRouteSnapshot)
        );

        expect(navigateSpy).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith(
            [AuthFeatureName, AuthRoutes.LOGIN],
            { queryParams: { code: '123' } }
        );
    });
});
