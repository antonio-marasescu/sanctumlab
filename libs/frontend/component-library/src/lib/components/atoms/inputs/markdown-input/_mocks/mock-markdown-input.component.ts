import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ngx-clib-markdown-input',
    imports: [ReactiveFormsModule],
    template: `
        <input
            type="text"
            [attr.id]="id()"
            [attr.name]="id()"
            [formControl]="control()"
            [placeholder]="placeholder()"
            [attr.aria-label]="label()"
        />
    `
})
export class MockMarkdownInputComponent {
    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl<string>>();
    public placeholder = input.required<string>();
}
