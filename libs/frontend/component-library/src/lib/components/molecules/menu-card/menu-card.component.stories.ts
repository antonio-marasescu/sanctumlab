import type { Meta, StoryObj } from '@storybook/angular';
import { MenuCardComponent } from './menu-card.component';
import { ComponentThemes } from '../../../types/shared/theme.types';

const meta: Meta<MenuCardComponent> = {
    component: MenuCardComponent,
    title: 'Molecules/MenuCard',
    argTypes: {
        indicatorTheme: {
            control: { type: 'radio' },
            options: [...Object.keys(ComponentThemes)]
        }
    }
};
export default meta;
type Story = StoryObj<MenuCardComponent>;

export const Primary: Story = {
    args: {
        id: 'cocktail-001',
        title: 'Margarita',
        description:
            'A refreshing cocktail with tequila, lime juice, and orange liqueur, served with salt on the rim.',
        hasIndicator: false,
        indicator: 'disabled',
        indicatorTheme: 'primary'
    }
};
