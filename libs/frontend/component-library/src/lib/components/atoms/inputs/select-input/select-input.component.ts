import {
    ChangeDetectionStrategy,
    Component,
    input,
    signal
} from '@angular/core';
import {
    FormControl,
    FormControlStatus,
    ReactiveFormsModule
} from '@angular/forms';
import { InputState } from '../../../../types/internal/input-internal.types';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NgClass } from '@angular/common';
import { SelectOption } from '../../../../types/atoms/select.types';
import { InputValidationComponent } from '../../../internal/input-validation.component';
import { I18nPipe } from '../../../../pipes/i18n.pipe';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-select-input',
    imports: [ReactiveFormsModule, NgClass, InputValidationComponent, I18nPipe],
    template: `<label class="form-control w-full">
        <div class="label">
            <span class="label-text">{{ label() | i18nTranslate }}</span>
        </div>
        <select
            [attr.id]="id()"
            tabindex="0"
            class="select w-full"
            [autofocus]="autofocus()"
            [ngClass]="{
                'select-primary': inputStyle() === 'default',
                'select-bordered': inputStyle() === 'bordered',
                'select-ghost': inputStyle() === 'ghost',
                'select-error': controlState() === InputState.INVALID
            }"
            [formControl]="control()"
        >
            <option value="" disabled selected>
                {{ placeholder() | i18nTranslate }}
            </option>
            @for (option of options(); track option.id) {
                <option [value]="option.id">{{ option.label }}</option>
            }
        </select>
        <ngx-clib-input-validation
            [control]="control()"
            (controlStateChange)="controlState.set($event)"
        />
    </label>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent {
    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl<string>>();
    public options = input.required<SelectOption[]>();
    public placeholder = input.required<string>();
    public autofocus = input<boolean>(false);
    public inputStyle = input<'default' | 'bordered' | 'ghost'>('default');
    protected readonly InputState = InputState;
    protected controlState = signal<FormControlStatus>(InputState.VALID);
}
