import { RecipeModel } from '../database-types.domain';
import { RecipeCategoryDomain } from '../enums/recipes-enums.domain';

export const createMockRecipeModel = (
    overwriteValues: Partial<RecipeModel> = {}
): RecipeModel => ({
    id: '12345',
    name: 'Cuba Libre',
    description: 'How to make cuba libre',
    ingredients: [],
    category: RecipeCategoryDomain.Drinks,
    ...overwriteValues
});
