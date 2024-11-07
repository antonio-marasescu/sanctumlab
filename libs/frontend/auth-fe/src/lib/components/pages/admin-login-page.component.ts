import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TextInputComponent } from '@sanctumlab/fe/component-library';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AdminLoginFormViewComponent } from '../views/admin-login-form-view/admin-login-form-view.component';
import { Router } from '@angular/router';
import { AuthFeatureName, AuthRoutes } from '../../types/auth-navigation.types';
import { AdminForm } from '../../types/auth-form.types';
import { from, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GuestLoginFormViewComponent } from '../views/guest-login-form-view/guest-login-form-view.component';

@Component({
    selector: 'ngx-auth-admin-login-page',
    standalone: true,
    imports: [
        TextInputComponent,
        AdminLoginFormViewComponent,
        AsyncPipe,
        GuestLoginFormViewComponent
    ],
    template: `<ngx-auth-admin-login-form-view
        [form]="adminForm"
        [validLogin]="validLogin$ | async"
        (loginEvent)="onLogin()"
        (redirectToGuestLogin)="onRedirectToGuestLogin()"
    />`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginPageComponent implements OnInit {
    protected adminForm!: FormGroup<AdminForm>;
    protected validLogin$: Observable<boolean> = of(true);

    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router
    ) {}

    ngOnInit() {
        this.adminForm = new FormGroup<AdminForm>({
            username: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(4)]
            })
        });
    }

    protected async onLogin(): Promise<void> {
        if (this.adminForm.invalid) {
            return;
        }
        const { username, password } = this.adminForm.getRawValue();
        this.validLogin$ = from(
            this.authenticationService.login(username, password)
        );
    }

    protected async onRedirectToGuestLogin(): Promise<void> {
        await this.router.navigate([AuthFeatureName, AuthRoutes.LOGIN]);
    }
}
