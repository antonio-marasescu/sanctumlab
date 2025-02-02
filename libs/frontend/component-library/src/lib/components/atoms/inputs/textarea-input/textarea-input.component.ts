import {
    ChangeDetectionStrategy,
    Component,
    input,
    signal
} from '@angular/core';
import {
    FormControl,
    FormControlStatus,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { InputState } from '../../../../types/internal/input-internal.types';
import { NgClass } from '@angular/common';
import { InputValidationComponent } from '../../../internal/input-validation.component';
import { I18nPipe } from '../../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-textarea-input',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        InputValidationComponent,
        I18nPipe
    ],
    template: `<div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">{{ label() | i18nTranslate }}</span>
            </div>
            <textarea
                tabindex="0"
                class="textarea w-full"
                [attr.id]="id()"
                [attr.name]="id()"
                [formControl]="control()"
                [placeholder]="placeholder() | i18nTranslate"
                [attr.aria-label]="label()"
                [autofocus]="autofocus()"
                autocomplete="false"
                [ngClass]="{
                    'textarea-primary': inputStyle() === 'default',
                    'textarea-bordered': inputStyle() === 'bordered',
                    'textarea-ghost': inputStyle() === 'ghost',
                    'textarea-error': controlState() === InputState.INVALID
                }"
            ></textarea>
            <ngx-clib-input-validation
                [control]="control()"
                (controlStateChange)="controlState.set($event)"
            />
        </label>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaInputComponent {
    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl<string>>();
    public placeholder = input.required<string>();
    public autofocus = input<boolean>(false);
    public inputStyle = input<'default' | 'bordered' | 'ghost'>('default');
    protected readonly InputState = InputState;
    protected controlState = signal<FormControlStatus>(InputState.VALID);
}
