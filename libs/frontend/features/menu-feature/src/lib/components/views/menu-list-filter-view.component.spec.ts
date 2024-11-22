import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { provideMockAuthConfiguration } from '@sanctumlab/fe/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductFilterForm } from '../../types/product-filter-form.types';
import { MenuListFilterViewComponent } from './menu-list-filter-view.component';

describe('MenuListFilterViewComponent', () => {
    let component: MenuListFilterViewComponent;
    let fixture: ComponentFixture<MenuListFilterViewComponent>;
    let form: FormGroup<ProductFilterForm>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MenuListFilterViewComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration(),
                provideMockAuthConfiguration()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuListFilterViewComponent);
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
        component.form = form;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });
});
