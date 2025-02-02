import {
    ChangeDetectionStrategy,
    Component,
    input,
    signal
} from '@angular/core';
import {
    FormControl,
    FormControlStatus,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { InputState } from '../../../../types/internal/input-internal.types';
import { NgClass } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { InputValidationComponent } from '../../../internal/input-validation.component';
import { I18nPipe } from '../../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-list-input',
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgIcon,
        InputValidationComponent,
        I18nPipe
    ],
    template: `<div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">{{ label() | i18nTranslate }}</span>
            </div>
            <div class="flex gap-2">
                <input
                    tabindex="0"
                    class="input w-full"
                    type="text"
                    [attr.id]="id()"
                    [attr.name]="id()"
                    [formControl]="internalFormControl"
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
                <button
                    class="btn btn-primary btn-circle"
                    [disabled]="internalFormControl.invalid"
                    (click)="onAddItem()"
                >
                    <ng-icon name="matPlus" size="20"></ng-icon>
                </button>
            </div>

            <ngx-clib-input-validation
                [control]="control()"
                (controlStateChange)="controlState.set($event)"
            />
        </label>
        <div class="flex pt-3 gap-3">
            @for (item of control().value; track item) {
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
    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl<string[]>>();
    public placeholder = input.required<string>();
    public autofocus = input<boolean>(false);
    public inputStyle = input<'default' | 'bordered' | 'ghost'>('default');

    protected readonly InputState = InputState;
    protected internalFormControl = new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.minLength(1), Validators.required]
    });
    protected controlState = signal<FormControlStatus>(InputState.VALID);

    protected onAddItem(): void {
        const newItem = this.internalFormControl.getRawValue();
        const oldValue = this.control().getRawValue();
        this.control().markAsTouched();
        this.control().patchValue([...oldValue, newItem]);
        this.internalFormControl.reset();
    }

    protected onRemoveItem(itemReference: string): void {
        const oldValue = this.control().getRawValue();
        const newValue = oldValue.filter(item => item !== itemReference);
        this.control().markAsTouched();
        this.control().patchValue([...newValue]);
        this.internalFormControl.reset();
    }
}
