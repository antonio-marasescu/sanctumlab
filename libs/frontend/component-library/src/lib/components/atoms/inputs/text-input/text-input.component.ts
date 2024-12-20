import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import {
    InputState,
    InputStateType
} from '../../../../types/internal/input-internal.types';
import { TextInputType } from '../../../../types/atoms/text-input.types';
import { InputValidationComponent } from '../../../internal/input-validation.component';
import { I18nPipe } from '../../../../pipes/i18n.pipe';

@Component({
    selector: `ngx-clib-text-input`,
    imports: [ReactiveFormsModule, NgClass, InputValidationComponent, I18nPipe],
    template: `<div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">{{ label | i18nTranslate }}</span>
            </div>
            <input
                class="input w-full"
                tabindex="0"
                [type]="type"
                [attr.id]="id"
                [attr.name]="id"
                [formControl]="control"
                [placeholder]="placeholder | i18nTranslate"
                [attr.aria-label]="label"
                [autofocus]="autofocus"
                autocomplete="false"
                [ngClass]="{
                    'input-primary': inputStyle === 'default',
                    'input-bordered': inputStyle === 'bordered',
                    'input-ghost': inputStyle === 'ghost',
                    'input-error': controlState === InputState.Invalid
                }"
            />
            <ngx-clib-input-validation
                [control]="control"
                (controlStateChange)="controlState = $event"
            />
        </label>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string>;
    @Input({ required: true }) placeholder!: string;
    @Input({ required: false }) type: TextInputType = 'text';
    @Input({ required: false }) autofocus = false;
    @Input({ required: false }) inputStyle: 'default' | 'bordered' | 'ghost' =
        'default';
    protected readonly InputState = InputState;
    protected controlState: InputStateType = InputState.Valid;
}
