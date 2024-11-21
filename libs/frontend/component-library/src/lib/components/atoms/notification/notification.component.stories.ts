import type { Meta, StoryObj } from '@storybook/angular';
import { NotificationComponent } from './notification.component';
import { ComponentThemes } from '../../../types/shared/theme.types';

const meta: Meta<NotificationComponent> = {
    component: NotificationComponent,
    title: 'Atoms/Notification',
    argTypes: {
        theme: {
            control: { type: 'radio' },
            options: [
                ...Object.keys(ComponentThemes).filter(
                    x => !['primary', 'accent', 'secondary'].includes(x)
                )
            ]
        }
    }
};
export default meta;
type Story = StoryObj<NotificationComponent>;

export const Primary: Story = {
    args: {
        id: 'alert-001',
        label: 'Task failed successfully',
        theme: 'neutral',
        description: 'You have 1 unread message',
        icon: 'matWarning'
    }
};
