import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EnvironmentInjector,
    Inject,
    Input,
    OnInit,
    runInInjectionContext
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    InputState,
    InputStateType
} from '../../../../types/internal/input-internal.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { retrieveErrorMessage } from '../../../../utils/validation.utils';
import {
    InputValidationConfigToken,
    InputValidationConfiguration
} from '../../../../config/input-validation.config';
import { NgClass } from '@angular/common';
import { SelectOption } from '../../../../types/atoms/select.types';
import { I18NextModule } from 'angular-i18next';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-select-input',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, I18NextModule],
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
        @if (controlState === InputState.Invalid && errorMessage) {
            <div class="label">
                <span class="label-text-alt text-error">{{
                    errorMessage
                }}</span>
            </div>
        }
    </label>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent implements OnInit {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string>;
    @Input({ required: true }) options: SelectOption[] = [];
    @Input({ required: true }) placeholder!: string;
    @Input({ required: false }) autofocus = false;
    @Input({ required: false }) inputStyle: 'default' | 'bordered' | 'ghost' =
        'default';
    protected readonly InputState = InputState;
    protected errorMessage = '';

    constructor(
        @Inject(InputValidationConfigToken)
        private readonly validationConfiguration: InputValidationConfiguration,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.control.statusChanges.pipe(untilDestroyed(this)).subscribe(() => {
            this.errorMessage = runInInjectionContext(this.injector, () =>
                retrieveErrorMessage(this.validationConfiguration, this.control)
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
