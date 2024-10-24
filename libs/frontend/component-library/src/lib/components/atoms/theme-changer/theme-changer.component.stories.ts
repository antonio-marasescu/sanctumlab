import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeChangerComponent } from './theme-changer.component';

const meta: Meta<ThemeChangerComponent> = {
    component: ThemeChangerComponent,
    title: 'Atoms/ThemeChanger',
    render: args => ({
        props: {
            ...args
        }
    })
};
export default meta;
type Story = StoryObj<ThemeChangerComponent>;

export const Primary: Story = {
    args: {}
};
