import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { I18nPipe } from '../../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-toggle-input',
    imports: [ReactiveFormsModule, I18nPipe],
    template: ` <label class="form-control h-full">
        <div class="label">
            <span class="label-text">{{ label() | i18nTranslate }}</span>
        </div>
        <div class="min-h-12">
            <input
                tabindex="0"
                type="checkbox"
                [formControl]="control()"
                class="toggle toggle-primary"
                checked="checked"
            />
        </div>
    </label>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleInputComponent {
    public control = input.required<FormControl<boolean>>();
    public label = input.required<string>();
}
