import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    waitForAsync
} from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminForm } from '../../../types/auth-form.types';
import { AdminLoginFormViewComponent } from './admin-login-form-view.component';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { By } from '@angular/platform-browser';

describe('AdminLoginFormViewComponent', () => {
    let component: AdminLoginFormViewComponent;
    let fixture: ComponentFixture<AdminLoginFormViewComponent>;
    let form: FormGroup<AdminForm>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AdminLoginFormViewComponent],
            providers: [provideMockInputValidationConfiguration()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminLoginFormViewComponent);
        form = new FormGroup<AdminForm>({
            username: new FormControl<string>('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.email
                ]
            }),
            password: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3)]
            })
        });
        component = fixture.componentInstance;
        fixture.componentRef.setInput('form', form);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should have login button disabled if form invalid', () => {
        const button = fixture.debugElement.query(By.css('#login-button'));
        form.patchValue({ username: '', password: '' });
        fixture.detectChanges();
        expect(button.componentInstance.disabled).toBeTruthy();
    });

    it('should emit loginEvent on login button press', () => {
        const button = fixture.debugElement.query(By.css('#login-button'));
        const loginEventSpy = jest.spyOn(component.loginEvent, 'emit');

        form.patchValue({ username: 'test@email.com', password: '123456' });
        fixture.detectChanges();
        expect(button.componentInstance.disabled()).toBeFalsy();

        button.children[0].nativeElement.click();
        expect(loginEventSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit redirectToAdminLogin on redirect link press', () => {
        const button = fixture.debugElement.query(By.css('#redirect-link'));
        const redirectEventSpy = jest.spyOn(
            component.redirectToGuestLogin,
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
