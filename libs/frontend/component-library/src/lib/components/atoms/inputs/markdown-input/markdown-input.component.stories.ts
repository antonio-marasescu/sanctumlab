import type { Meta, StoryObj } from '@storybook/angular';
import { MarkdownInputComponent } from './markdown-input.component';
import { FormControl, Validators } from '@angular/forms';

const control = new FormControl<string>('', {
    validators: [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(3),
        Validators.pattern('^[a-z]+$')
    ],
    nonNullable: true
});

const meta: Meta<MarkdownInputComponent> = {
    title: 'Atoms/Inputs/MarkdownInput',
    component: MarkdownInputComponent,
    render: args => ({
        props: {
            ...args,
            control
        }
    }),
    argTypes: {}
};
export default meta;
type Story = StoryObj<MarkdownInputComponent>;

export const Primary: Story = {
    args: {
        id: 'rich-text-input',
        label: 'Rich Text Label',
        placeholder: 'Rich Text Input'
    }
};
