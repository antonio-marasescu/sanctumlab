import {
    CreateIngredientDto,
    IngredientDto,
    UpdateIngredientDto
} from '../ingredients-api.types';

export const createMockIngredientDto = (
    overwriteValues: Partial<IngredientDto> = {}
): IngredientDto => ({
    id: '12345',
    name: 'Lime',
    icon: 'assets/lime.svg',
    quantity: 1,
    ...overwriteValues
});

export const createMockCreateIngredientDto = (
    overwriteValues: Partial<CreateIngredientDto> = {}
): CreateIngredientDto => ({
    name: 'Lime',
    icon: 'assets/lime.svg',
    quantity: 1,
    ...overwriteValues
});

export const createMockUpdateIngredientDto = (
    overwriteValues: Partial<UpdateIngredientDto> = {}
): UpdateIngredientDto => ({
    name: 'Lime',
    icon: 'assets/lime.svg',
    quantity: 1,
    ...overwriteValues
});
