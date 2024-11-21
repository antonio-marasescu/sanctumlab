import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    InputState,
    InputStateType
} from '../../../../types/internal/input-internal.types';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NgClass } from '@angular/common';
import { SelectOption } from '../../../../types/atoms/select.types';
import { I18NextModule } from 'angular-i18next';
import { InputValidationComponent } from '../../../internal/input-validation.component';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-select-input',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass,
        I18NextModule,
        InputValidationComponent
    ],
    template: `<label class="form-control w-full">
        <div class="label">
            <span class="label-text">{{ label | i18nextEager }}</span>
        </div>
        <select
            [attr.id]="id"
            tabindex="0"
            class="select w-full"
            [autofocus]="autofocus"
            [ngClass]="{
                'select-primary': inputStyle === 'default',
                'select-bordered': inputStyle === 'bordered',
                'select-ghost': inputStyle === 'ghost',
                'select-error': controlState === InputState.Invalid
            }"
            [formControl]="control"
        >
            <option value="" disabled selected>
                {{ placeholder | i18nextEager }}
            </option>
            @for (option of options; track option.id) {
                <option [value]="option.id">{{ option.label }}</option>
            }
        </select>
        <ngx-clib-input-validation
            [control]="control"
            (controlStateChange)="controlState = $event"
        />
    </label>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string>;
    @Input({ required: true }) options: SelectOption[] = [];
    @Input({ required: true }) placeholder!: string;
    @Input({ required: false }) autofocus = false;
    @Input({ required: false }) inputStyle: 'default' | 'bordered' | 'ghost' =
        'default';
    protected readonly InputState = InputState;
    protected controlState: InputStateType = InputState.Valid;
}
