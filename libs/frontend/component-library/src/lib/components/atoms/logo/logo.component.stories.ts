import type { Meta, StoryObj } from '@storybook/angular';
import { LogoComponent } from './logo.component';
import { ComponentSizes } from '../../../types/shared/theme.types';

const meta: Meta<LogoComponent> = {
    title: 'Atoms/Logo',
    component: LogoComponent,
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: [...Object.keys(ComponentSizes)]
        }
    }
};
export default meta;
type Story = StoryObj<LogoComponent>;

export const Primary: Story = {
    args: {
        logoUrl: 'assets/logo-bg.png',
        title: 'Sanctum Lab',
        useTitle: true,
        size: 'md',
        isResponsive: false,
        interactable: false
    }
};
