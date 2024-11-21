import type { Meta, StoryObj } from '@storybook/angular';
import { LoadingIndicatorComponent } from './loading-indicator.component';

const meta: Meta<LoadingIndicatorComponent> = {
    component: LoadingIndicatorComponent,
    title: 'Atoms/LoadingIndicator',
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: ['md', 'lg']
        }
    }
};
export default meta;
type Story = StoryObj<LoadingIndicatorComponent>;

export const Primary: Story = {
    args: {
        isOverlay: false,
        size: 'md'
    }
};
