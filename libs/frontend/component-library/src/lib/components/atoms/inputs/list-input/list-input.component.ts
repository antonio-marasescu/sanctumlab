import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnInit
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgIcon } from '@ng-icons/core';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-list-input',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIcon],
    template: `<div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">{{ label }}</span>
            </div>
            <div class="flex gap-2">
                <input
                    class="input w-full"
                    type="text"
                    [attr.id]="id"
                    [attr.name]="id"
                    [formControl]="internalFormControl"
                    [placeholder]="placeholder"
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
                <button
                    class="btn btn-primary btn-circle"
                    [disabled]="internalFormControl.invalid"
                    (click)="onAddItem()"
                >
                    <ng-icon name="matPlus" size="20"></ng-icon>
                </button>
            </div>

            @if (controlState === InputState.Invalid && errorMessage) {
                <div class="label">
                    <span class="label-text-alt text-error"
                        >{{ errorMessage }}
                    </span>
                </div>
            }
        </label>
        <div class="flex pt-2 gap-3">
            @for (item of control.value; track item) {
                <div class="flex items-center gap-1">
                    <div class="badge  badge-primary badge-lg">
                        {{ item }}
                    </div>
                    <button
                        class="btn btn-circle btn-ghost btn-xs"
                        (click)="onRemoveItem(item)"
                    >
                        <ng-icon name="matDelete" size="20"></ng-icon>
                    </button>
                </div>
            }
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListInputComponent implements OnInit {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string[]>;
    @Input({ required: false }) placeholder?: string = '';
    @Input({ required: false }) autofocus = false;
    @Input({ required: false }) inputStyle: 'default' | 'bordered' | 'ghost' =
        'default';

    protected readonly InputState = InputState;
    protected internalFormControl = new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.minLength(1), Validators.required]
    });
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

    protected onAddItem(): void {
        const newItem = this.internalFormControl.getRawValue();
        const oldValue = this.control.getRawValue();
        this.control.markAsTouched();
        this.control.patchValue([...oldValue, newItem]);
        this.internalFormControl.reset();
    }

    protected onRemoveItem(itemReference: string): void {
        const oldValue = this.control.getRawValue();
        const newValue = oldValue.filter(item => item !== itemReference);
        this.control.markAsTouched();
        this.control.patchValue([...newValue]);
        this.internalFormControl.reset();
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
