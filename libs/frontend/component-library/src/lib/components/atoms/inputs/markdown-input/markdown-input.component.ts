import {
    ChangeDetectionStrategy,
    Component,
    input,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import {
    FormControl,
    FormControlStatus,
    ReactiveFormsModule
} from '@angular/forms';
import { InputState } from '../../../../types/internal/input-internal.types';
import { NgClass } from '@angular/common';
import { InputValidationComponent } from '../../../internal/input-validation.component';
import { I18nPipe } from '../../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-markdown-input',
    imports: [
        QuillEditorComponent,
        ReactiveFormsModule,
        NgClass,
        InputValidationComponent,
        I18nPipe
    ],
    template: `<div class="form-control w-full" [id]="id()">
        <div class="label">
            <span class="label-text">{{ label() | i18nTranslate }}</span>
        </div>
        <quill-editor
            tabindex="0"
            class="border rounded-xl"
            [ngClass]="{
                'border-primary': this.controlState() === InputState.VALID,
                'border-error': this.controlState() === InputState.INVALID
            }"
            [formControl]="control()"
            [placeholder]="placeholder() | i18nTranslate"
        ></quill-editor>

        <ngx-clib-input-validation
            [control]="control()"
            (controlStateChange)="controlState.set($event)"
        />
    </div>`,
    styleUrls: ['markdown-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownInputComponent {
    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl<string>>();
    public placeholder = input.required<string>();
    protected readonly InputState = InputState;
    protected controlState = signal<FormControlStatus>(InputState.VALID);
}
