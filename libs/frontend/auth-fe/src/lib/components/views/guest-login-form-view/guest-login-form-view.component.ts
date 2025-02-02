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
import { GuestForm } from '../../../types/auth-form.types';

@Component({
    selector: 'ngx-auth-guest-login-form-view',
    imports: [
        TextInputComponent,
        LogoComponent,
        ButtonComponent,
        ReactiveFormsModule,
        I18nPipe
    ],
    templateUrl: 'guest-login-form-view.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestLoginFormViewComponent {
    public form = input.required<FormGroup<GuestForm>>();
    public validLogin = input<boolean | null>(true);
    public loginEvent = output<void>();
    public redirectToAdminLogin = output<void>();
}
