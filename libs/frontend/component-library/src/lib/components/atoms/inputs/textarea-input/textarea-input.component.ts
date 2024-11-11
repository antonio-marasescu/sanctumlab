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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    InputValidationConfigToken,
    InputValidationConfiguration
} from '../../../../config/input-validation.config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { retrieveErrorMessage } from '../../../../utils/validation.utils';
import {
    InputState,
    InputStateType
} from '../../../../types/internal/input-internal.types';
import { NgClass } from '@angular/common';
import { I18NextModule } from 'angular-i18next';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-textarea-input',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgClass, I18NextModule],
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
            @if (controlState === InputState.Invalid && errorMessage) {
                <div class="label">
                    <span class="label-text-alt text-error">{{
                        errorMessage
                    }}</span>
                </div>
            }
        </label>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaInputComponent implements OnInit {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string>;
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
