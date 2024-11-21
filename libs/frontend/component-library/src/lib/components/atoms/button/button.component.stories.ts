import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import {
    ComponentSizes,
    ComponentThemes
} from '../../../types/shared/theme.types';

const meta: Meta<ButtonComponent> = {
    component: ButtonComponent,
    title: 'Atoms/Button',
    argTypes: {
        theme: {
            control: { type: 'radio' },
            options: [...Object.keys(ComponentThemes), 'ghost']
        },
        size: {
            control: { type: 'radio' },
            options: [
                ...Object.keys(ComponentSizes).filter(size => size !== 'xl')
            ]
        }
    }
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
    args: {
        label: 'Button',
        theme: 'primary',
        size: 'md',
        isOutlined: false,
        isActive: false,
        isResponsive: false,
        isCircle: false,
        isWide: false,
        disabled: false
    }
};
