import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    MarkdownInputComponent,
    MockMarkdownInputComponent,
    provideMockInputValidationConfiguration
} from '@sanctumlab/fe/component-library';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItemFormViewComponent } from './menu-item-form-view.component';
import { ProductItemForm } from '../../types/product-item-form.types';
import { By } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import { matPlus } from '@ng-icons/material-icons/baseline';

jest.mock('ngx-quill');
describe('MenuItemFormViewComponent', () => {
    let component: MenuItemFormViewComponent;
    let fixture: ComponentFixture<MenuItemFormViewComponent>;
    let form: FormGroup<ProductItemForm>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MenuItemFormViewComponent],
            providers: [
                provideMockInputValidationConfiguration(),
                provideIcons({
                    matPlus
                })
            ]
        })
            .overrideComponent(MenuItemFormViewComponent, {
                add: { imports: [MockMarkdownInputComponent] },
                remove: { imports: [MarkdownInputComponent] }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemFormViewComponent);
        form = new FormGroup<ProductItemForm>({
            name: new FormControl<string>('Test', {
                nonNullable: true,
                validators: []
            }),
            description: new FormControl<string>('Test', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            category: new FormControl<string>('Unknown', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            recipe: new FormControl<string>('Test', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            tags: new FormControl<string[]>(['test'], {
                nonNullable: true,
                validators: [Validators.required]
            }),
            available: new FormControl<boolean>(false, {
                nonNullable: true,
                validators: [Validators.required]
            })
        });
        component = fixture.componentInstance;
        fixture.componentRef.setInput('form', form);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should emit submit event', () => {
        fixture.detectChanges();
        const submitEventSpy = jest.spyOn(component.submitEvent, 'emit');
        const submitButton = fixture.debugElement.query(
            By.css(`#submit-button`)
        );
        expect(submitButton).toBeDefined();
        submitButton.children[0].nativeElement.click();
        expect(submitEventSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit close event', () => {
        fixture.detectChanges();
        const closeEventSpy = jest.spyOn(component.closeEvent, 'emit');
        const closeButton = fixture.debugElement.query(By.css(`#close-button`));
        expect(closeButton).toBeDefined();
        closeButton.children[0].nativeElement.click();
        expect(closeEventSpy).toHaveBeenCalledTimes(1);
    });
});
