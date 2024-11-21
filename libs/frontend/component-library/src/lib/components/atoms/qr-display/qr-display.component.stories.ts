import type { Meta, StoryObj } from '@storybook/angular';
import { QRDisplayComponent } from './qr-display.component';

const meta: Meta<QRDisplayComponent> = {
    component: QRDisplayComponent,
    title: 'Atoms/QRDisplay',
    argTypes: {
        errorLevel: {
            control: { type: 'radio' },
            options: ['L', 'M', 'Q', 'H']
        }
    }
};
export default meta;
type Story = StoryObj<QRDisplayComponent>;

export const Primary: Story = {
    args: {
        data: 'https://www.google.com',
        isResponsive: false,
        width: 256,
        errorLevel: 'M'
    }
};
