import type { Meta, StoryObj } from '@storybook/angular';
import { LibraryIconsOptions } from '../../../types/iconography/iconography.types';
import { IconSelectorComponent } from './icon-selector.component';
import { FormControl, Validators } from '@angular/forms';
import {
    ComponentSizes,
    ComponentThemes
} from '../../../types/shared/theme.types';

const control = new FormControl<string>('matRamenDining', {
    validators: [Validators.required],
    nonNullable: true
});

const meta: Meta<IconSelectorComponent> = {
    component: IconSelectorComponent,
    title: 'Molecules/IconSelector',
    render: args => ({
        props: {
            ...args,
            control
        }
    }),
    argTypes: {
        theme: {
            control: { type: 'radio' },
            options: [...Object.keys(ComponentThemes), 'ghost']
        },
        size: {
            control: { type: 'radio' },
            options: [
                ...Object.keys(ComponentSizes).filter(size => size !== 'xl')
            ]
        }
    }
};
export default meta;
type Story = StoryObj<IconSelectorComponent>;

export const Primary: Story = {
    args: {
        options: [...LibraryIconsOptions],
        size: 'sm',
        iconSize: 16,
        theme: 'neutral',
        isOutlined: false,
        isCircle: false,
        disabled: false
    }
};
