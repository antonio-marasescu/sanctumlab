import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    InputState,
    InputStateType
} from '../../../../types/internal/input-internal.types';
import { NgClass } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { I18NextModule } from 'angular-i18next';
import { InputValidationComponent } from '../../../internal/input-validation.component';

@Component({
    selector: 'ngx-clib-list-input',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgIcon,
        I18NextModule,
        InputValidationComponent
    ],
    template: `<div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">{{ label | i18nextEager }}</span>
            </div>
            <div class="flex gap-2">
                <input
                    tabindex="0"
                    class="input w-full"
                    type="text"
                    [attr.id]="id"
                    [attr.name]="id"
                    [formControl]="internalFormControl"
                    [placeholder]="placeholder | i18nextEager"
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

            <ngx-clib-input-validation
                [control]="control"
                (controlStateChange)="controlState = $event"
            />
        </label>
        <div class="flex pt-3 gap-3">
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
export class ListInputComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string[]>;
    @Input({ required: true }) placeholder!: string;
    @Input({ required: false }) autofocus = false;
    @Input({ required: false }) inputStyle: 'default' | 'bordered' | 'ghost' =
        'default';

    protected readonly InputState = InputState;
    protected internalFormControl = new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.minLength(1), Validators.required]
    });
    protected controlState: InputStateType = InputState.Valid;

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
}
