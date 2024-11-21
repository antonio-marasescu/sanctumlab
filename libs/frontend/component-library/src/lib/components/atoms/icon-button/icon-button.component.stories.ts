import type { Meta, StoryObj } from '@storybook/angular';
import {
    ComponentSizes,
    ComponentThemes
} from '../../../types/shared/theme.types';
import { IconButtonComponent } from './icon-button.component';

const meta: Meta<IconButtonComponent> = {
    component: IconButtonComponent,
    title: 'Atoms/IconButton',
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
type Story = StoryObj<IconButtonComponent>;

export const Primary: Story = {
    args: {
        icon: 'matMenu',
        size: 'md',
        iconSize: 16,
        theme: 'primary',
        isOutlined: false,
        isCircle: false,
        disabled: false
    }
};
