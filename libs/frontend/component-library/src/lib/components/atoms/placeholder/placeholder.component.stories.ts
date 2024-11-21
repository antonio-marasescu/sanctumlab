import type { Meta, StoryObj } from '@storybook/angular';
import { PlaceholderComponent } from './placeholder.component';

const meta: Meta<PlaceholderComponent> = {
    component: PlaceholderComponent,
    title: 'Atoms/Placeholder',
    argTypes: {}
};
export default meta;
type Story = StoryObj<PlaceholderComponent>;

export const Primary: Story = {
    args: {
        title: 'No data',
        label: 'Try adjusting your search or filter'
    }
};
