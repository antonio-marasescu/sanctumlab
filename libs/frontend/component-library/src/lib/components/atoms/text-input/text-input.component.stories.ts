import type { Meta, StoryObj } from '@storybook/angular';
import { TextInputComponent } from './text-input.component';
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

const meta: Meta<TextInputComponent> = {
    title: 'Atoms/TextInput',
    component: TextInputComponent,
    render: args => ({
        props: {
            ...args,
            control
        }
    }),
    argTypes: {
        type: {
            control: { type: 'radio' },
            options: ['text', 'password', 'textarea']
        },
        inputStyle: {
            control: { type: 'radio' },
            options: ['default', 'bordered']
        }
    }
};
export default meta;
type Story = StoryObj<TextInputComponent>;

export const Primary: Story = {
    args: {
        id: 'text-input',
        label: 'Label',
        type: 'text',
        placeholder: 'Text Input',
        autofocus: false,
        inputStyle: 'default'
    }
};
