import type { Meta, StoryObj } from '@storybook/angular';
import { SceneCanvasComponent } from './scene-canvas.component';

const meta: Meta<SceneCanvasComponent> = {
    component: SceneCanvasComponent,
    title: 'Organisms/SceneCanvas',
    render: args => ({
        template: `
          <div style="height: 400px;">
            <ngx-clib-scene-canvas />
          </div>
        `,
        props: {
            ...args
        }
    }),
    argTypes: {}
};
export default meta;
type Story = StoryObj<SceneCanvasComponent>;

export const Primary: Story = {
    args: {}
};
