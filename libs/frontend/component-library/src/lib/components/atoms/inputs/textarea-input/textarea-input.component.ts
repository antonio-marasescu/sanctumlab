import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    InputState,
    InputStateType
} from '../../../../types/internal/input-internal.types';
import { NgClass } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { InputValidationComponent } from '../../../internal/input-validation.component';

@Component({
    selector: 'ngx-clib-textarea-input',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        I18NextModule,
        InputValidationComponent
    ],
    template: `<div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">{{ label | i18nextEager }}</span>
            </div>
            <textarea
                tabindex="0"
                class="textarea w-full"
                [attr.id]="id"
                [attr.name]="id"
                [formControl]="control"
                [placeholder]="placeholder | i18nextEager"
                [attr.aria-label]="label"
                [autofocus]="autofocus"
                autocomplete="false"
                [ngClass]="{
                    'textarea-primary': inputStyle === 'default',
                    'textarea-bordered': inputStyle === 'bordered',
                    'textarea-ghost': inputStyle === 'ghost',
                    'textarea-error': controlState === InputState.Invalid
                }"
            ></textarea>

            <ngx-clib-input-validation
                [control]="control"
                (controlStateChange)="controlState = $event"
            />
        </label>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaInputComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string>;
    @Input({ required: true }) placeholder!: string;
    @Input({ required: false }) autofocus = false;
    @Input({ required: false }) inputStyle: 'default' | 'bordered' | 'ghost' =
        'default';
    protected readonly InputState = InputState;
    protected controlState: InputStateType = InputState.Valid;
}
