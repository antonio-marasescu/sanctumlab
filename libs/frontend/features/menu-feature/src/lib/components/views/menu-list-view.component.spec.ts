import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { MenuListViewComponent } from './menu-list-view.component';
import {
    AuthenticationService,
    provideMockAuthConfiguration
} from '@sanctumlab/fe/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductFilterForm } from '../../types/product-filter-form.types';
import { By } from '@angular/platform-browser';
import { createMockProductItemDto } from '@sanctumlab/api-interfaces';

describe('MenuListViewComponent', () => {
    let component: MenuListViewComponent;
    let fixture: ComponentFixture<MenuListViewComponent>;
    let mockAuthService: Partial<AuthenticationService>;
    let form: FormGroup<ProductFilterForm>;

    beforeEach(waitForAsync(() => {
        mockAuthService = {
            isAdmin: () => Promise.resolve(true)
        };
        TestBed.configureTestingModule({
            imports: [MenuListViewComponent],
            providers: [
                provideMockInputValidationConfiguration(),
                provideMockAuthConfiguration(),
                {
                    provide: AuthenticationService,
                    useValue: mockAuthService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuListViewComponent);
        form = new FormGroup<ProductFilterForm>({
            showUnavailable: new FormControl<boolean>(false, {
                nonNullable: true,
                validators: []
            }),
            search: new FormControl<string>('', {
                nonNullable: true,
                validators: []
            })
        });
        component = fixture.componentInstance;
        fixture.componentRef.setInput('filterForm', form);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should hide/show create button based on user admin role', () => {
        jest.spyOn(mockAuthService, 'isAdmin').mockReturnValue(
            Promise.resolve(false)
        );
        fixture.detectChanges();

        let createButton = fixture.debugElement.query(By.css(`#create-button`));

        expect(createButton).toBeNull();

        jest.spyOn(mockAuthService, 'isAdmin').mockReturnValue(
            Promise.resolve(true)
        );
        fixture.detectChanges();

        createButton = fixture.debugElement.query(By.css(`#create-button`));
        expect(createButton).toBeDefined();
    });

    it('should display cards based on items input', () => {
        const items = [
            createMockProductItemDto({ id: 'item-1' }),
            createMockProductItemDto({ id: 'item-2' })
        ];
        fixture.componentRef.setInput('items', items);
        fixture.detectChanges();

        for (const item of items) {
            const card = fixture.debugElement.query(By.css(`#${item.id}`));
            expect(card).toBeDefined();
        }
    });
});
