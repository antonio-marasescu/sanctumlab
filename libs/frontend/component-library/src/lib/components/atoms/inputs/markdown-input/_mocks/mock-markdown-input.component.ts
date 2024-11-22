import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ngx-clib-markdown-input',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <input
            type="text"
            [attr.id]="id"
            [attr.name]="id"
            [formControl]="control"
            [placeholder]="placeholder"
            [attr.aria-label]="label"
        />
    `
})
export class MockMarkdownInputComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) control!: FormControl<string>;
    @Input({ required: true }) placeholder!: string;
}
