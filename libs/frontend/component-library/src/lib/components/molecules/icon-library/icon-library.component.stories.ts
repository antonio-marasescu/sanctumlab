import type { Meta, StoryObj } from '@storybook/angular';
import { IconLibraryComponent } from './icon-library.component';
import { LibraryIconsOptions } from '../../../types/iconography/iconography.types';

const meta: Meta<IconLibraryComponent> = {
    component: IconLibraryComponent,
    title: 'Molecules/IconLibrary',
    argTypes: {}
};
export default meta;
type Story = StoryObj<IconLibraryComponent>;

export const Primary: Story = {
    args: {
        options: [...LibraryIconsOptions]
    }
};
