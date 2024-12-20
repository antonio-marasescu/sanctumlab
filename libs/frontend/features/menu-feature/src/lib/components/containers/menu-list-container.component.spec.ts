import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { provideMockStore } from '@ngrx/store/testing';
import {
    createMockDataAccessInitialState,
    ProductApiService
} from '@sanctumlab/fe/data-access';
import {
    AuthenticationService,
    createMockAuthInitialState
} from '@sanctumlab/fe/auth';
import { AppNavigationService } from '@sanctumlab/fe/shared';
import { MenuListContainerComponent } from './menu-list-container.component';
import { of } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {
    createMockProductItemDto,
    ProductItemCategory
} from '@sanctumlab/api-interfaces';

describe('MenuListContainerComponent', () => {
    let component: MenuListContainerComponent;
    let fixture: ComponentFixture<MenuListContainerComponent>;
    let mockAppNavigation: Partial<AppNavigationService>;
    let mockProductsApiService: Partial<ProductApiService>;
    let mockAuthService: Partial<AuthenticationService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;
    let mockParams: Record<string, string>;

    beforeEach(waitForAsync(() => {
        mockParams = {
            showUnavailable: 'true',
            search: ''
        };
        mockAppNavigation = {
            navigateToMenuCreateItem: jest.fn(),
            applyQueryParamsToRoute: jest.fn()
        };
        mockProductsApiService = {
            retrieveProductsIsLoadingStream: () => of(false),
            retrieveProductsByCategoryStream: () =>
                of([createMockProductItemDto()]),
            sendRetrieveProductList: jest.fn(),
            sendSetCurrentProduct: jest.fn()
        };
        mockAuthService = {
            isAdmin: () => Promise.resolve(true)
        };
        mockActivatedRoute = {
            snapshot: {
                queryParamMap: {
                    get: (key: string) => {
                        return mockParams[key] as string;
                    }
                }
            } as unknown as ActivatedRouteSnapshot
        };
        TestBed.configureTestingModule({
            imports: [MenuListContainerComponent],
            providers: [
                provideMockInputValidationConfiguration(),
                provideMockStore({
                    initialState: {
                        ...createMockDataAccessInitialState(),
                        ...createMockAuthInitialState()
                    }
                }),
                {
                    provide: AppNavigationService,
                    useValue: mockAppNavigation
                },
                {
                    provide: ProductApiService,
                    useValue: mockProductsApiService
                },
                {
                    provide: AuthenticationService,
                    useValue: mockAuthService
                },
                {
                    provide: ActivatedRoute,
                    useValue: mockActivatedRoute
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuListContainerComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should initialize forms and subscriptions on ngOnInit', () => {
        expect(component['filterForm']).toBeUndefined();
        expect(component['isLoading$']).toBeUndefined();
        expect(component['items$']).toBeUndefined();

        fixture.detectChanges();

        expect(component['filterForm']).toBeDefined();
        expect(component['isLoading$']).toBeDefined();
        expect(component['items$']).toBeDefined();
    });

    it('should send retrieve products on ngOnInit', () => {
        const spyRetrieve = jest.spyOn(
            mockProductsApiService,
            'sendRetrieveProductList'
        );
        fixture.detectChanges();
        expect(spyRetrieve).toHaveBeenCalledTimes(1);
    });

    it('should populate filter form on ngOnInit', () => {
        mockParams['showUnavailable'] = 'true';
        mockParams['search'] = 'Something';
        fixture.detectChanges();
        expect(component['filterForm'].value).toEqual({
            showUnavailable: true,
            search: 'Something'
        });
    });

    it('should apply query params to route on filter form value changes', fakeAsync(() => {
        fixture.detectChanges();
        const applyQueryParamsToRouteSpy = jest.spyOn(
            mockAppNavigation,
            'applyQueryParamsToRoute'
        );

        component['filterForm'].patchValue({
            showUnavailable: false,
            search: 'Something else'
        });
        fixture.detectChanges();
        tick(401);
        expect(applyQueryParamsToRouteSpy).toHaveBeenCalledTimes(1);
        expect(applyQueryParamsToRouteSpy).toHaveBeenCalledWith({
            showUnavailable: 'false',
            search: 'Something else'
        });
    }));

    it('should resubscribe on category change to retrieve products stream', () => {
        fixture.componentRef.setInput('category', ProductItemCategory.Unknown);
        fixture.detectChanges();

        const retrieveProductsSpy = jest.spyOn(
            mockProductsApiService,
            'retrieveProductsByCategoryStream'
        );
        fixture.componentRef.setInput('category', ProductItemCategory.Snacks);
        fixture.detectChanges();

        expect(retrieveProductsSpy).toHaveBeenCalledTimes(1);
        expect(retrieveProductsSpy).toHaveBeenCalledWith(
            ProductItemCategory.Snacks
        );
    });

    it('should set current product on items select event', () => {
        fixture.detectChanges();
        const setCurrentProductSpy = jest.spyOn(
            mockProductsApiService,
            'sendSetCurrentProduct'
        );
        const id = 'product-1234';

        component['onItemSelect'](id);

        expect(setCurrentProductSpy).toHaveBeenCalledTimes(1);
        expect(setCurrentProductSpy).toHaveBeenCalledWith(id);
    });

    it('should navigate to create on create event', () => {
        fixture.detectChanges();
        const navigateToMenuCreateItemSpy = jest.spyOn(
            mockAppNavigation,
            'navigateToMenuCreateItem'
        );

        component['onCreateEvent']();

        expect(navigateToMenuCreateItemSpy).toHaveBeenCalledTimes(1);
    });
});
