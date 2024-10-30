import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ngx-clib-toggle-input',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `<div class="form-control">
        <label class="label cursor-pointer justify-start gap-4">
            <span class="label-text">{{ label }}</span>
            <input
                type="checkbox"
                [formControl]="control"
                class="toggle toggle-primary"
                checked="checked"
            />
        </label>
    </div>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleInputComponent {
    @Input({ required: true }) control!: FormControl<boolean>;
    @Input({ required: true }) label!: string;
}
