import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { AppSidebarComponent } from './app-sidebar.component';
import { AppNavigationService } from '../../services/app-navigation.service';
import { ThemingService } from '../../services/theming.service';
import {
    createMockAuthInitialState,
    provideMockAuthConfiguration
} from '@sanctumlab/fe/auth';
import { provideMockStore } from '@ngrx/store/testing';
import { createMockDataAccessInitialState } from '@sanctumlab/fe/data-access';
import { provideIcons } from '@ng-icons/core';
import {
    matClose,
    matFastfood,
    matLocalBar,
    matMenu,
    matQrCode
} from '@ng-icons/material-icons/baseline';

describe('AppSidebarComponent', () => {
    let component: AppSidebarComponent;
    let fixture: ComponentFixture<AppSidebarComponent>;
    let mockAppNavigationService: Partial<AppNavigationService>;
    let mockThemingService: Partial<ThemingService>;

    beforeEach(waitForAsync(() => {
        mockAppNavigationService = {
            navigateToMenuCocktails: jest.fn(),
            navigateToMenuSnacks: jest.fn(),
            navigateToMenuFeature: jest.fn()
        };
        mockThemingService = {
            toggleDarkMode: jest.fn(),
            toggleLightMode: jest.fn(),
            isDarkMode: jest.fn(),
            isLightMode: jest.fn(),
            isNoThemeSelected: jest.fn()
        };
        TestBed.configureTestingModule({
            declarations: [],
            imports: [AppSidebarComponent],
            providers: [
                provideMockInputValidationConfiguration(),
                provideMockStore({
                    initialState: {
                        ...createMockDataAccessInitialState(),
                        ...createMockAuthInitialState()
                    }
                }),
                provideIcons({
                    matFastfood,
                    matLocalBar,
                    matMenu,
                    matClose,
                    matQrCode
                }),
                provideMockAuthConfiguration(),
                {
                    provide: AppNavigationService,
                    useValue: mockAppNavigationService
                },
                {
                    provide: ThemingService,
                    useValue: mockThemingService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppSidebarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should set the theme control based on the current theme dark', () => {
        jest.spyOn(mockThemingService, 'isNoThemeSelected').mockReturnValue(
            false
        );
        jest.spyOn(mockThemingService, 'isDarkMode').mockReturnValue(true);
        expect(component['themeControl']).toBeUndefined();

        fixture.detectChanges();

        expect(component['themeControl'].value).toBe(true);
    });

    it('should set the theme control to true if no theme is selected', () => {
        jest.spyOn(mockThemingService, 'isNoThemeSelected').mockReturnValue(
            true
        );
        jest.spyOn(mockThemingService, 'isDarkMode').mockReturnValue(false);
        expect(component['themeControl']).toBeUndefined();

        fixture.detectChanges();

        expect(component['themeControl'].value).toBe(true);
    });

    it('should change theme in service if control value changes', fakeAsync(() => {
        jest.spyOn(mockThemingService, 'isNoThemeSelected').mockReturnValue(
            false
        );
        jest.spyOn(mockThemingService, 'isDarkMode').mockReturnValue(true);
        fixture.detectChanges();

        const themeServiceSpy = jest.spyOn(
            mockThemingService,
            'toggleLightMode'
        );

        component['themeControl'].setValue(false);
        tick();
        expect(themeServiceSpy).toHaveBeenCalledTimes(1);
    }));

    it('should navigate based on id', fakeAsync(() => {
        fixture.detectChanges();

        const spyNavigateCocktails = jest.spyOn(
            mockAppNavigationService,
            'navigateToMenuCocktails'
        );
        component['onNavigate']('cocktails');

        expect(spyNavigateCocktails).toHaveBeenCalledTimes(1);

        const spyNavigateSnacks = jest.spyOn(
            mockAppNavigationService,
            'navigateToMenuSnacks'
        );
        component['onNavigate']('snacks');
        expect(spyNavigateSnacks).toHaveBeenCalledTimes(1);
    }));

    it('should navigate to home', fakeAsync(() => {
        fixture.detectChanges();

        const spyNavigateMenuFeature = jest.spyOn(
            mockAppNavigationService,
            'navigateToMenuFeature'
        );
        component['onNavigateHome']();

        expect(spyNavigateMenuFeature).toHaveBeenCalledTimes(1);
    }));

    it('should open and close modal', fakeAsync(() => {
        fixture.detectChanges();

        expect(component['modalOpened']).toBe(false);
        component['onOpenModal']();
        expect(component['modalOpened']).toBe(true);
        component['onCloseModal']();
        expect(component['modalOpened']).toBe(false);
    }));
});
