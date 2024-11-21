import { TestBed } from '@angular/core/testing';
import {
    Router,
    ActivatedRoute,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AppNavigationService } from './app-navigation.service';
import {
    AppFeatureRoutes,
    MenuFeatureRoutes,
    ProfileFeatureRoutes
} from '../types/app-routes.types';
import { of } from 'rxjs';

describe('AppNavigationService', () => {
    let service: AppNavigationService;
    let mockRouter: Partial<Router>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockRouter = {
            navigate: jest.fn()
        };
        mockActivatedRoute = {
            snapshot: new ActivatedRouteSnapshot(),
            queryParams: of({})
        };
        TestBed.configureTestingModule({
            providers: [
                AppNavigationService,
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });

        service = TestBed.inject(AppNavigationService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should navigate to menu feature', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        await service.navigateToMenuFeature();
        expect(navigateSpy).toHaveBeenCalledWith([AppFeatureRoutes.MENU]);
    });

    it('should navigate to menu cocktails', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        await service.navigateToMenuCocktails();
        expect(navigateSpy).toHaveBeenCalledWith([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.COCKTAILS
        ]);
    });

    it('should navigate to menu snacks', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        await service.navigateToMenuSnacks();
        expect(navigateSpy).toHaveBeenCalledWith([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.SNACKS
        ]);
    });

    it('should navigate to menu create item', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        await service.navigateToMenuCreateItem();
        expect(navigateSpy).toHaveBeenCalledWith([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.CREATE
        ]);
    });

    it('should navigate to menu edit item with id', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        const testId = '123';
        await service.navigateToMenuEditItem(testId);
        expect(navigateSpy).toHaveBeenCalledWith([
            AppFeatureRoutes.MENU,
            MenuFeatureRoutes.EDIT,
            testId
        ]);
    });

    it('should navigate to profile settings', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        await service.navigateToProfileSettings();
        expect(navigateSpy).toHaveBeenCalledWith([
            AppFeatureRoutes.PROFILE,
            ProfileFeatureRoutes.SETTINGS
        ]);
    });

    it('should apply query params to route with default strategy', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        const params = { key: 'value' };
        await service.applyQueryParamsToRoute(params);
        expect(navigateSpy).toHaveBeenCalledWith([], {
            relativeTo: mockActivatedRoute,
            queryParams: params,
            queryParamsHandling: 'replace'
        });
    });

    it('should apply query params to route with merge strategy', async () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        const params = { key: 'value' };
        await service.applyQueryParamsToRoute(params, 'merge');
        expect(navigateSpy).toHaveBeenCalledWith([], {
            relativeTo: mockActivatedRoute,
            queryParams: params,
            queryParamsHandling: 'merge'
        });
    });
});
