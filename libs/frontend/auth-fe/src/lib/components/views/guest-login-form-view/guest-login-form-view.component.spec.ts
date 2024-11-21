import { GuestLoginFormViewComponent } from './guest-login-form-view.component';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestForm } from '../../../types/auth-form.types';
import { By } from '@angular/platform-browser';

describe('GuestLoginFormViewComponent', () => {
    let component: GuestLoginFormViewComponent;
    let fixture: ComponentFixture<GuestLoginFormViewComponent>;
    let form: FormGroup<GuestForm>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GuestLoginFormViewComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GuestLoginFormViewComponent);
        form = new FormGroup<GuestForm>({
            code: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3)]
            })
        });
        component = fixture.componentInstance;
        component.form = form;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should have login button disabled if form invalid', () => {
        const button = fixture.debugElement.query(By.css('#login-button'));
        form.patchValue({ code: '' });
        fixture.detectChanges();
        expect(button.componentInstance.disabled).toBeTruthy();
    });

    it('should emit loginEvent on login button press', () => {
        const button = fixture.debugElement.query(By.css('#login-button'));
        const loginEventSpy = jest.spyOn(component.loginEvent, 'emit');

        form.patchValue({ code: '123456' });
        fixture.detectChanges();
        expect(button.componentInstance.disabled).toBeFalsy();

        button.children[0].nativeElement.click();
        expect(loginEventSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit redirectToAdminLogin on redirect link press', () => {
        const button = fixture.debugElement.query(By.css('#redirect-link'));
        const redirectEventSpy = jest.spyOn(
            component.redirectToAdminLogin,
            'emit'
        );

        button.nativeElement.click();
        expect(redirectEventSpy).toHaveBeenCalledTimes(1);
    });

    it('should display error message on invalid login input', fakeAsync(() => {
        fixture.componentRef.setInput('validLogin', false);
        fixture.detectChanges();
        const errorMessageElement = fixture.debugElement.query(
            By.css('#form-error-message')
        );
        expect(errorMessageElement).toBeTruthy();
    }));
});
