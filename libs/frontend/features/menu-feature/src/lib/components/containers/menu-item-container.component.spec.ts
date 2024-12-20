import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
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
import { of } from 'rxjs';
import { MenuItemContainerComponent } from './menu-item-container.component';
import { MenuItemViewComponent } from '../views/menu-item-view.component';
import { QuillViewComponent } from 'ngx-quill';
import { createMockProductItemDto } from '@sanctumlab/api-interfaces';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'quill-view',
    standalone: true,
    imports: [],
    template: ``
})
export class MockQuillViewComponent {
    @Input() content?: string;
}
jest.mock('ngx-quill');

describe('MenuItemContainerComponent', () => {
    let component: MenuItemContainerComponent;
    let fixture: ComponentFixture<MenuItemContainerComponent>;
    let mockAppNavigation: Partial<AppNavigationService>;
    let mockProductsApiService: Partial<ProductApiService>;
    let mockAuthService: Partial<AuthenticationService>;

    beforeEach(waitForAsync(() => {
        mockAppNavigation = {
            navigateToMenuEditItem: jest.fn()
        };
        mockProductsApiService = {
            retrieveCurrentProductStream: jest.fn(),
            sendUnsetCurrentProduct: jest.fn(),
            sendRemoveProduct: jest.fn(),
            sendUpdateProduct: jest.fn()
        };
        mockAuthService = {
            isAdmin: () => Promise.resolve(true)
        };
        TestBed.configureTestingModule({
            imports: [MenuItemContainerComponent],
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
                }
            ]
        })
            .overrideComponent(MenuItemViewComponent, {
                add: { imports: [MockQuillViewComponent] },
                remove: { imports: [QuillViewComponent] }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemContainerComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should initialize subscription on ngOnInit', () => {
        expect(component['item$']).toBeUndefined();
        jest.spyOn(
            mockProductsApiService,
            'retrieveCurrentProductStream'
        ).mockReturnValue(of(createMockProductItemDto()));

        fixture.detectChanges();

        expect(component['item$']).toBeDefined();
    });

    it('should navigate to edit item on item edit event', () => {
        fixture.detectChanges();
        const navigateToMenuEditItemSpy = jest.spyOn(
            mockAppNavigation,
            'navigateToMenuEditItem'
        );
        const payload = 'product-1234';

        component['onItemEdit'](payload);

        expect(navigateToMenuEditItemSpy).toHaveBeenCalledTimes(1);
        expect(navigateToMenuEditItemSpy).toHaveBeenCalledWith(payload);
    });

    it('should send unset current product on modal closed', () => {
        fixture.detectChanges();
        const spyUnset = jest.spyOn(
            mockProductsApiService,
            'sendUnsetCurrentProduct'
        );

        component['onModalClosed']();
        expect(spyUnset).toHaveBeenCalledTimes(1);
    });

    it('should send unset current and remove product on delete event', () => {
        fixture.detectChanges();
        const id = 'product-1234';
        const spyUnset = jest.spyOn(
            mockProductsApiService,
            'sendUnsetCurrentProduct'
        );
        const spyRemove = jest.spyOn(
            mockProductsApiService,
            'sendRemoveProduct'
        );

        component['onDeleteEvent'](id);
        expect(spyUnset).toHaveBeenCalledTimes(1);
        expect(spyRemove).toHaveBeenCalledTimes(1);
        expect(spyRemove).toHaveBeenCalledWith(id);
    });

    it('should send update product on enable event', () => {
        fixture.detectChanges();
        const id = 'product-1234';
        const payload = createMockProductItemDto({ id, available: false });

        const spyUpdate = jest.spyOn(
            mockProductsApiService,
            'sendUpdateProduct'
        );

        component['onEnableEvent'](payload);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(spyUpdate).toHaveBeenCalledWith(id, {
            ...payload,
            available: true
        });
    });

    it('should send update product on disable event', () => {
        fixture.detectChanges();
        const id = 'product-1234';
        const payload = createMockProductItemDto({ id, available: true });

        const spyUpdate = jest.spyOn(
            mockProductsApiService,
            'sendUpdateProduct'
        );

        component['onDisableEvent'](payload);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(spyUpdate).toHaveBeenCalledWith(id, {
            ...payload,
            available: false
        });
    });
});
