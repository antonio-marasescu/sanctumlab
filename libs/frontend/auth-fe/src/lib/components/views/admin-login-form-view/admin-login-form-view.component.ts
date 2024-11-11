import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {
    ButtonComponent,
    LogoComponent,
    TextInputComponent
} from '@sanctumlab/fe/component-library';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminForm } from '../../../types/auth-form.types';
import { I18NextModule } from 'angular-i18next';

@Component({
    selector: 'ngx-auth-admin-login-form-view',
    standalone: true,
    imports: [
        TextInputComponent,
        LogoComponent,
        ButtonComponent,
        ReactiveFormsModule,
        I18NextModule
    ],
    templateUrl: 'admin-login-form-view.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginFormViewComponent {
    @Input({ required: true }) form!: FormGroup<AdminForm>;
    @Input({ required: true }) validLogin: boolean | null = true;
    @Output() loginEvent = new EventEmitter<void>();
    @Output() redirectToGuestLogin = new EventEmitter<void>();
}
