import { ProductModel } from '../database-types.domain';
import { ProductItemCategoryDomain } from '../enums/products-enums.domain';

export const createMockProductModel = (
    overwriteValues: Partial<ProductModel> = {}
): ProductModel => ({
    id: '12345',
    name: 'Margarita',
    description: 'A refreshing cocktail with lime and tequila',
    category: ProductItemCategoryDomain.Cocktail,
    recipe: 'Mix tequila, lime juice, and triple sec. Shake with ice and serve in a salt-rimmed glass.',
    tags: ['cocktail', 'alcoholic', 'lime'],
    available: true,
    ...overwriteValues
});
