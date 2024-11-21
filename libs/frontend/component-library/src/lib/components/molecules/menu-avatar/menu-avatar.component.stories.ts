import type { Meta, StoryObj } from '@storybook/angular';
import { ComponentSizes } from '../../../types/shared/theme.types';
import { MenuAvatarComponent } from './menu-avatar.component';

const meta: Meta<MenuAvatarComponent> = {
    component: MenuAvatarComponent,
    title: 'Molecules/MenuAvatar',
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: [...Object.keys(ComponentSizes)]
        }
    }
};
export default meta;
type Story = StoryObj<MenuAvatarComponent>;

export const Primary: Story = {
    args: {
        placeholder: 'AM',
        isPlaceholder: true,
        size: 'xs',
        isCircle: true,
        url: 'assets/logo.png',
        items: [
            { id: 'login', label: 'Login' },
            { id: 'logout', label: 'Logout' }
        ]
    }
};
