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
import { NgClass } from '@angular/common';
import { InputState } from '../../../../types/internal/input-internal.types';
import { TextInputType } from '../../../../types/atoms/text-input.types';
import { InputValidationComponent } from '../../../internal/input-validation.component';
import { I18nPipe } from '../../../../pipes/i18n.pipe';

@Component({
    selector: `ngx-clib-text-input`,
    imports: [ReactiveFormsModule, NgClass, InputValidationComponent, I18nPipe],
    template: `<div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">{{ label() | i18nTranslate }}</span>
            </div>
            <input
                class="input w-full"
                tabindex="0"
                [type]="type()"
                [attr.id]="id()"
                [attr.name]="id()"
                [formControl]="control()"
                [placeholder]="placeholder() | i18nTranslate"
                [attr.aria-label]="label()"
                [autofocus]="autofocus()"
                autocomplete="false"
                [ngClass]="{
                    'input-primary': inputStyle() === 'default',
                    'input-bordered': inputStyle() === 'bordered',
                    'input-ghost': inputStyle() === 'ghost',
                    'input-error': controlState() === InputState.INVALID
                }"
            />
            <ngx-clib-input-validation
                [control]="control()"
                (controlStateChange)="controlState.set($event)"
            />
        </label>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent {
    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl<string>>();
    public placeholder = input.required<string>();
    public type = input<TextInputType>('text');
    public autofocus = input<boolean>(false);
    public inputStyle = input<'default' | 'bordered' | 'ghost'>('default');
    protected readonly InputState = InputState;
    protected controlState = signal<FormControlStatus>(InputState.VALID);
}
