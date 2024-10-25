import type { Meta, StoryObj } from '@storybook/angular';
import { ComponentSizes } from '../../../types/shared/theme.types';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
    component: AvatarComponent,
    title: 'Atoms/Avatar',
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: [...Object.keys(ComponentSizes)]
        }
    }
};
export default meta;
type Story = StoryObj<AvatarComponent>;

export const Primary: Story = {
    args: {
        placeholder: 'AM',
        isPlaceholder: true,
        size: 'sm',
        isCircle: true,
        url: 'assets/logo.png',
        interactable: true
    }
};
