import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import {
    ButtonComponent,
    I18nPipe,
    LogoComponent,
    TextInputComponent
} from '@sanctumlab/fe/component-library';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminForm } from '../../../types/auth-form.types';

@Component({
    selector: 'ngx-auth-admin-login-form-view',
    imports: [
        TextInputComponent,
        LogoComponent,
        ButtonComponent,
        ReactiveFormsModule,
        I18nPipe
    ],
    templateUrl: 'admin-login-form-view.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginFormViewComponent {
    public form = input.required<FormGroup<AdminForm>>();
    public validLogin = input<boolean | null>(true);
    public loginEvent = output<void>();
    public redirectToGuestLogin = output<void>();
}
