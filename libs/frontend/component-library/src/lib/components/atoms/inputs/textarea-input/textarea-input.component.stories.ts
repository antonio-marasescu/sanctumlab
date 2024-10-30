import type { Meta, StoryObj } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { TextareaInputComponent } from './textarea-input.component';

const control = new FormControl<string>('', {
    validators: [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(3),
        Validators.pattern('^[a-z]+$')
    ],
    nonNullable: true
});

const meta: Meta<TextareaInputComponent> = {
    title: 'Atoms/Inputs/TextareaInput',
    component: TextareaInputComponent,
    render: args => ({
        props: {
            ...args,
            control
        }
    }),
    argTypes: {
        inputStyle: {
            control: { type: 'radio' },
            options: ['default', 'bordered', 'ghost']
        }
    }
};
export default meta;
type Story = StoryObj<TextareaInputComponent>;

export const Primary: Story = {
    args: {
        id: 'text-input',
        label: 'Label',
        placeholder: 'Text Input',
        autofocus: false,
        inputStyle: 'default'
    }
};
