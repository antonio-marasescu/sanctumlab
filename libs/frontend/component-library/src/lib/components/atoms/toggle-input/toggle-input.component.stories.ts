import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleInputComponent } from './toggle-input.component';
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

const meta: Meta<ToggleInputComponent> = {
    component: ToggleInputComponent,
    title: 'Atoms/Inputs/ToggleInput',
    render: args => ({
        props: {
            ...args,
            control
        }
    })
};
export default meta;
type Story = StoryObj<ToggleInputComponent>;

export const Primary: Story = {
    args: {
        label: 'Toggle'
    }
};
