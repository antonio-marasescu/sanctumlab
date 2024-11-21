import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    InputState,
    InputStateType
} from '../../../../types/internal/input-internal.types';
import { NgClass } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { InputValidationComponent } from '../../../internal/input-validation.component';

@Component({
    selector: 'ngx-clib-markdown-input',
    standalone: true,
    imports: [
        QuillEditorComponent,
        ReactiveFormsModule,
        NgClass,
        I18NextModule,
        InputValidationComponent
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

        <ngx-clib-input-validation
            [control]="control"
            (controlStateChange)="controlState = $event"
        />
    </div>`,
    styleUrls: ['markdown-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownInputComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string>;
    @Input({ required: true }) placeholder!: string;
    protected readonly InputState = InputState;
    protected controlState: InputStateType = InputState.Valid;
}
