import { IngredientModel } from '../database-types.domain';

export const createMockIngredientModel = (
    overwriteValues: Partial<IngredientModel> = {}
): IngredientModel => ({
    id: '12345',
    name: 'Lime',
    icon: 'assets/lime.png',
    quantity: 1,
    ...overwriteValues
});
