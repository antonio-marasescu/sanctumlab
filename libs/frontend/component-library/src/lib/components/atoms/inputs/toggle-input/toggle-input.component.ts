import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';

@Component({
    selector: 'ngx-clib-toggle-input',
    standalone: true,
    imports: [ReactiveFormsModule, I18NextModule],
    template: ` <label class="form-control h-full">
        <div class="label">
            <span class="label-text">{{ label | i18nextEager }}</span>
        </div>
        <div class="min-h-12">
            <input
                tabindex="0"
                type="checkbox"
                [formControl]="control"
                class="toggle toggle-primary"
                checked="checked"
            />
        </div>
    </label>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleInputComponent {
    @Input({ required: true }) control!: FormControl<boolean>;
    @Input({ required: true }) label!: string;
}
