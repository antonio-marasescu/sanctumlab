import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
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
    @Input({ required: true }) form!: FormGroup<GuestForm>;
    @Input({ required: true }) validLogin: boolean | null = true;
    @Output() loginEvent = new EventEmitter<void>();
    @Output() redirectToAdminLogin = new EventEmitter<void>();
}
