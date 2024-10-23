import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { TextInputComponent } from '@sanctumlab/fe/component-library';
import { FormGroup } from '@angular/forms';
import { GuestForm } from '../../../types/auth-form.types';

@Component({
    selector: 'ngx-auth-guest-login-form-view',
    standalone: true,
    imports: [TextInputComponent],
    templateUrl: 'guest-login-form-view.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestLoginFormViewComponent {
    @Input() form!: FormGroup<GuestForm>;
    @Output() loginEvent = new EventEmitter<void>();
    @Output() redirectToAdminLogin = new EventEmitter<void>();
}
