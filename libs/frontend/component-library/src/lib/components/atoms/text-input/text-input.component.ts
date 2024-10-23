import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnInit
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import {
    InputState,
    InputStateType
} from '../../../types/internal/input-internal.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TextInputType } from '../../../types/atoms/text-input.types';
import {
    InputValidationConfigToken,
    InputValidationConfiguration
} from '../../../config/input-validation.config';
import { retrieveErrorMessage } from '../../../utils/validation.utils';

@UntilDestroy()
@Component({
    selector: `ngx-clib-text-input`,
    standalone: true,
    imports: [ReactiveFormsModule, NgClass],
    template: `<div>
        <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ label }}</label
        >
        <input
            class="text-input"
            [ngClass]="{
                invalid: controlState === InputState.Invalid,
                default: controlState === InputState.Valid,
                disabled: this.disabled
            }"
            [type]="type"
            [attr.id]="id"
            [attr.name]="id"
            [formControl]="control"
            [placeholder]="placeholder"
            [required]="required"
            [attr.aria-label]="label"
            [autofocus]="autofocus"
            autocomplete="false"
        />
        @if (controlState === InputState.Invalid) {
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {{ errorMessage }}
            </p>
        }
    </div>`,
    styleUrl: 'text-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent implements OnInit {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: false }) type: TextInputType = 'text';
    @Input({ required: false }) placeholder?: string = '';
    @Input({ required: false }) required = false;
    @Input({ required: false }) autofocus = false;
    @Input({ required: true }) control!: FormControl<string>;
    protected readonly InputState = InputState;
    protected errorMessage = '';

    constructor(
        @Inject(InputValidationConfigToken)
        private validationConfiguration: InputValidationConfiguration,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.control.statusChanges.pipe(untilDestroyed(this)).subscribe(() => {
            this.errorMessage = retrieveErrorMessage(
                this.validationConfiguration,
                this.control
            );
            this.changeDetectorRef.markForCheck();
        });
    }

    protected get hasError(): boolean {
        return this.control.invalid && !this.control.untouched;
    }

    protected get disabled(): boolean {
        return this.control.disabled;
    }

    protected get controlState(): InputStateType {
        if (this.disabled) {
            return InputState.Disabled;
        }
        if (this.hasError) {
            return InputState.Invalid;
        }

        return InputState.Valid;
    }
}
