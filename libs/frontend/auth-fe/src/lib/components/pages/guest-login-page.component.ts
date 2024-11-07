import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TextInputComponent } from '@sanctumlab/fe/component-library';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { GuestLoginFormViewComponent } from '../views/guest-login-form-view/guest-login-form-view.component';
import { Router } from '@angular/router';
import { AuthFeatureName, AuthRoutes } from '../../types/auth-navigation.types';
import { GuestForm } from '../../types/auth-form.types';
import { AdminLoginFormViewComponent } from '../views/admin-login-form-view/admin-login-form-view.component';
import { from, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ngx-auth-guest-login-page',
    standalone: true,
    imports: [
        TextInputComponent,
        GuestLoginFormViewComponent,
        AdminLoginFormViewComponent,
        AsyncPipe
    ],
    template: `<ngx-auth-guest-login-form-view
        [form]="guestForm"
        [validLogin]="validLogin$ | async"
        (loginEvent)="onLogin()"
        (redirectToAdminLogin)="onRedirectToAdminLogin()"
    />`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestLoginPageComponent implements OnInit {
    protected guestForm!: FormGroup<GuestForm>;
    protected validLogin$: Observable<boolean> = of(true);

    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router
    ) {}

    ngOnInit() {
        this.guestForm = new FormGroup<GuestForm>({
            code: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3)]
            })
        });
    }

    protected async onLogin(): Promise<void> {
        if (this.guestForm.invalid) {
            return;
        }
        const { code } = this.guestForm.getRawValue();
        this.validLogin$ = from(this.authenticationService.loginAsGuest(code));
    }

    protected async onRedirectToAdminLogin(): Promise<void> {
        await this.router.navigate([AuthFeatureName, AuthRoutes.LOGIN_ADMIN]);
    }
}
