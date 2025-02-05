import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    MarkdownInputComponent,
    MockMarkdownInputComponent,
    provideMockInputValidationConfiguration
} from '@sanctumlab/fe/component-library';
import { provideIcons } from '@ng-icons/core';
import { matDelete, matPlus } from '@ng-icons/material-icons/baseline';
import { MenuItemFormContainerComponent } from './menu-item-form-container.component';
import { provideMockStore } from '@ngrx/store/testing';
import {
    createMockDataAccessInitialState,
    ProductApiService
} from '@sanctumlab/fe/data-access';
import { createMockAuthInitialState } from '@sanctumlab/fe/auth';
import { AppNavigationService } from '@sanctumlab/fe/shared';
import { MenuItemFormViewComponent } from '../views/menu-item-form-view.component';
import { createMockProductItemDto } from '@sanctumlab/api-interfaces';
import { of } from 'rxjs';

jest.mock('ngx-quill');
describe('MenuItemFormContainerComponent', () => {
    let component: MenuItemFormContainerComponent;
    let fixture: ComponentFixture<MenuItemFormContainerComponent>;
    let mockAppNavigation: Partial<AppNavigationService>;
    let mockProductsApiService: Partial<ProductApiService>;

    beforeEach(waitForAsync(() => {
        mockAppNavigation = {
            navigateToMenuFeature: jest.fn()
        };
        mockProductsApiService = {
            retrieveProductsIsLoadingStream: () => of(false)
        };
        TestBed.configureTestingModule({
            imports: [MenuItemFormContainerComponent],
            providers: [
                provideMockInputValidationConfiguration(),
                provideIcons({
                    matPlus,
                    matDelete
                }),
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
                }
            ]
        })
            .overrideComponent(MenuItemFormViewComponent, {
                add: { imports: [MockMarkdownInputComponent] },
                remove: { imports: [MarkdownInputComponent] }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemFormContainerComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('item', null);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should initialize subscription and form on ngOnInit', () => {
        fixture.detectChanges();
        expect(component['isLoading']).toBeDefined();
        expect(component['isLoading']()).toEqual(false);
        expect(component['form']).toBeDefined();
    });

    it('should update the form on item change', () => {
        fixture.detectChanges();
        const payload = createMockProductItemDto();

        fixture.componentRef.setInput('item', payload);
        fixture.detectChanges();

        expect(component['form'].value).toEqual({
            ...payload,
            id: undefined
        });
    });

    it('should emit on submitEvent', () => {
        fixture.detectChanges();
        const payload = createMockProductItemDto();
        fixture.componentRef.setInput('item', payload);
        fixture.detectChanges();

        const submitEventSpy = jest.spyOn(component.submitEvent, 'emit');

        component['onSubmitEvent']();

        expect(submitEventSpy).toHaveBeenCalledTimes(1);
        expect(submitEventSpy).toHaveBeenCalledWith({
            form: { ...payload, id: undefined },
            id: payload.id
        });
    });

    it('should navigate to menu feature on close event', () => {
        fixture.detectChanges();

        const navigateEventSpy = jest.spyOn(
            mockAppNavigation,
            'navigateToMenuFeature'
        );
        component['onCloseEvent']();

        expect(navigateEventSpy).toHaveBeenCalledTimes(1);
    });
});
