import {
    CreateRecipeDto,
    RecipeCategory,
    RecipeDto,
    UpdateRecipeDto
} from '../recipes-api.types';

export const createMockRecipeDto = (
    overwriteValues: Partial<RecipeDto> = {}
): RecipeDto => ({
    id: '12345',
    name: 'Cuba Libre',
    description: 'How to make cuba libre',
    ingredients: [],
    category: RecipeCategory.Drinks,
    ...overwriteValues
});

export const createMockCreateRecipeDto = (
    overwriteValues: Partial<CreateRecipeDto> = {}
): CreateRecipeDto => ({
    name: 'Cuba Libre',
    description: 'How to make cuba libre',
    ingredients: [],
    category: RecipeCategory.Drinks,
    ...overwriteValues
});

export const createMockUpdateRecipeDto = (
    overwriteValues: Partial<UpdateRecipeDto> = {}
): UpdateRecipeDto => ({
    name: 'Cuba Libre',
    description: 'How to make cuba libre',
    ingredients: [],
    category: RecipeCategory.Drinks,
    ...overwriteValues
});
