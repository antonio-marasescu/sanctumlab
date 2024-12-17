import {
    CreateProductItemDto,
    ProductItemCategory,
    ProductItemDto,
    UpdateProductItemDto
} from '../products-api.types';

export const createMockProductItemDto = (
    overwriteValues: Partial<ProductItemDto> = {}
): ProductItemDto => ({
    id: '12345',
    name: 'Margarita',
    description: 'A refreshing cocktail with lime and tequila',
    category: ProductItemCategory.Cocktail,
    recipe: 'Mix tequila, lime juice, and triple sec. Shake with ice and serve in a salt-rimmed glass.',
    tags: ['cocktail', 'alcoholic', 'lime'],
    available: true,
    ...overwriteValues
});

export const createMockCreateProductItemDto = (
    overwriteValues: Partial<CreateProductItemDto> = {}
): CreateProductItemDto => ({
    name: 'Nachos',
    description:
        'Crispy tortilla chips topped with melted cheese and jalapenos',
    category: ProductItemCategory.Snacks,
    recipe: 'Spread tortilla chips on a baking sheet, sprinkle cheese, add jalapenos, and bake until cheese melts.',
    tags: ['snack', 'vegetarian', 'cheese'],
    available: true,
    ...overwriteValues
});

export const createMockUpdateProductItemDto = (
    overwriteValues: Partial<UpdateProductItemDto> = {}
): UpdateProductItemDto => ({
    name: 'Updated Margarita',
    description: 'A classic cocktail updated with fresh mint',
    category: ProductItemCategory.Cocktail,
    recipe: 'Mix tequila, lime juice, triple sec, and fresh mint. Shake with ice and serve in a salt-rimmed glass.',
    tags: ['cocktail', 'mint'],
    available: false,
    ...overwriteValues
});
