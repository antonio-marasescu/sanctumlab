import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EnvironmentInjector,
    Inject,
    Input,
    OnInit,
    runInInjectionContext,
    ViewEncapsulation
} from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    InputState,
    InputStateType
} from '../../../../types/internal/input-internal.types';
import {
    InputValidationConfigToken,
    InputValidationConfiguration
} from '../../../../config/input-validation.config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { retrieveErrorMessage } from '../../../../utils/validation.utils';
import { NgClass } from '@angular/common';
import { I18NextModule } from 'angular-i18next';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-markdown-input',
    standalone: true,
    imports: [
        QuillEditorComponent,
        ReactiveFormsModule,
        NgClass,
        I18NextModule
    ],
    template: `<div class="form-control w-full" [id]="id">
        <div class="label">
            <span class="label-text">{{ label | i18nextEager }}</span>
        </div>
        <quill-editor
            tabindex="0"
            class="border rounded-xl"
            [ngClass]="{
                'border-primary': this.controlState === InputState.Valid,
                'border-error': this.controlState === InputState.Invalid
            }"
            [formControl]="control"
            [placeholder]="placeholder | i18nextEager"
        ></quill-editor>

        @if (controlState === InputState.Invalid && errorMessage) {
            <div class="label">
                <span class="label-text-alt text-error">{{
                    errorMessage
                }}</span>
            </div>
        }
    </div>`,
    styleUrls: ['markdown-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownInputComponent implements OnInit {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string>;
    @Input({ required: true }) placeholder!: string;
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
