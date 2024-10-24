import type { Meta, StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

const meta: Meta<SidebarComponent> = {
    component: SidebarComponent,
    title: 'Molecules/Sidebar'
};
export default meta;
type Story = StoryObj<SidebarComponent>;

export const Primary: Story = {
    args: {
        logoUrl: '',
        title: '',
        items: []
    }
};
