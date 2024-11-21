import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AuthFeatureName, AuthRoutes } from '../types/auth-navigation.types';

describe('adminGuard', () => {
    let mockAuthService: {
        isAdmin: jest.Mock;
    };
    let mockRouter: {
        navigate: jest.Mock;
    };

    beforeEach(() => {
        mockAuthService = {
            isAdmin: jest.fn()
        };
        mockRouter = {
            navigate: jest.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthenticationService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter }
            ]
        });
    });

    it('should allow navigation if user is admin', async () => {
        jest.spyOn(mockAuthService, 'isAdmin').mockReturnValue(
            Promise.resolve(true)
        );

        const result = await TestBed.runInInjectionContext(() => adminGuard());

        expect(result).toBe(true);
    });

    it('should not allow navigation if user is not admin', async () => {
        jest.spyOn(mockAuthService, 'isAdmin').mockReturnValue(
            Promise.resolve(false)
        );

        const result = await TestBed.runInInjectionContext(() => adminGuard());

        expect(result).toBe(false);
    });

    it('should redirect user to unauthorized page if user is not admin', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');

        await TestBed.runInInjectionContext(() => adminGuard());

        expect(navigateSpy).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith([
            AuthFeatureName,
            AuthRoutes.UNAUTHORIZED
        ]);
    });
});
