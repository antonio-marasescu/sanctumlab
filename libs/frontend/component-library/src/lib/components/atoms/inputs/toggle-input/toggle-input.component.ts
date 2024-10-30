import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ngx-clib-toggle-input',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: ` <label class="form-control h-full">
        <div class="label">
            <span class="label-text">{{ label }}</span>
        </div>
        <div class="min-h-12">
            <input
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
