import type { Meta, StoryObj } from '@storybook/angular';
import { ItemCardComponent } from './item-card.component';
import { ComponentThemes } from '../../../types/shared/theme.types';

const meta: Meta<ItemCardComponent> = {
    component: ItemCardComponent,
    title: 'Molecules/ItemCard',
    argTypes: {
        indicatorTheme: {
            control: { type: 'radio' },
            options: [...Object.keys(ComponentThemes)]
        }
    }
};
export default meta;
type Story = StoryObj<ItemCardComponent>;

export const Primary: Story = {
    args: {
        id: 'cocktail-001',
        title: 'Margarita',
        description:
            'A refreshing cocktail with tequila, lime juice, and orange liqueur, served with salt on the rim.',
        hasIndicator: false,
        indicator: 'disabled',
        indicatorTheme: 'primary',
        tags: ['Tequila', 'Lime', 'Orange Liqueur']
    }
};
