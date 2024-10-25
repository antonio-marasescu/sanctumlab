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
import { GuestForm } from '../../../types/auth-form.types';

@Component({
    selector: 'ngx-auth-guest-login-form-view',
    standalone: true,
    imports: [
        TextInputComponent,
        LogoComponent,
        ButtonComponent,
        ReactiveFormsModule
    ],
    templateUrl: 'guest-login-form-view.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestLoginFormViewComponent {
    @Input() form!: FormGroup<GuestForm>;
    @Output() loginEvent = new EventEmitter<void>();
    @Output() redirectToAdminLogin = new EventEmitter<void>();
}
