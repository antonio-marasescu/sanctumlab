import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
    title: 'Molecules/Modal',
    component: ModalComponent,
    render: args => ({
        template: `<ngx-clib-modal [opened]="opened" [positionBottom]="positionBottom">
            <div style="width: 100%; height: 140px; background: #0fa6ec; display: flex; justify-content: center; align-items: center; color: #e8e7e7" content>Content</div>
            <div style="width: 100%; height: 60px; background: #670fec; display: flex; justify-content: center; align-items: center; color: #e8e7e7" actions>Actions</div>
        </ngx-clib-modal>`,
        props: {
            ...args
        }
    }),
    argTypes: {}
};
export default meta;
type Story = StoryObj<ModalComponent>;

export const Primary: Story = {
    args: {
        opened: true,
        positionBottom: false
    }
};
