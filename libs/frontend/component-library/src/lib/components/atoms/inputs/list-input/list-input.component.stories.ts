import type { Meta, StoryObj } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { ListInputComponent } from './list-input.component';
import { minArrayLength } from '../../../../utils/validators.utils';

const control = new FormControl<string[]>([], {
    validators: [Validators.required, minArrayLength(2)],
    nonNullable: true
});

const meta: Meta<ListInputComponent> = {
    title: 'Atoms/Inputs/ListInput',
    component: ListInputComponent,
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
type Story = StoryObj<ListInputComponent>;

export const Primary: Story = {
    args: {
        id: 'list-input',
        label: 'Label',
        placeholder: 'List Input',
        autofocus: false,
        inputStyle: 'default'
    }
};
