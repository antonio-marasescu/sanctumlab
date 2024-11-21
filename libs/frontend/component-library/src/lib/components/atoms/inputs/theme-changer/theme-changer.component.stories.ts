import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeChangerComponent } from './theme-changer.component';
import { FormControl } from '@angular/forms';

const control = new FormControl<boolean>(false, {
    nonNullable: true
});

const meta: Meta<ThemeChangerComponent> = {
    component: ThemeChangerComponent,
    title: 'Atoms/Inputs/ThemeChanger',
    render: args => ({
        props: {
            ...args,
            control
        }
    })
};
export default meta;
type Story = StoryObj<ThemeChangerComponent>;

export const Primary: Story = {
    args: {}
};
