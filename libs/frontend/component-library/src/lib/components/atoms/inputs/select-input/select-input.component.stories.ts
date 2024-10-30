import type { Meta, StoryObj } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { SelectInputComponent } from './select-input.component';

const control = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true
});

const meta: Meta<SelectInputComponent> = {
    title: 'Atoms/Inputs/SelectInput',
    component: SelectInputComponent,
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
type Story = StoryObj<SelectInputComponent>;

export const Primary: Story = {
    args: {
        id: 'text-input',
        label: 'Label',
        placeholder: 'Select an option',
        inputStyle: 'default',
        options: [
            { id: 'opt-1', label: 'Option 1' },
            { id: 'opt-2', label: 'Option 2' },
            { id: 'opt-3', label: 'Option 3' }
        ]
    }
};
