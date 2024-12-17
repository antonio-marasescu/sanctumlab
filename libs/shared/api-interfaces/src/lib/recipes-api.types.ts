import { z } from 'zod';

export enum RecipeCategory {
    Food = 'Food',
    Drinks = 'Drinks',
    Snacks = 'Snacks',
    Unknown = 'Unknown'
}

export const RecipeCategoryValues = [
    RecipeCategory.Food,
    RecipeCategory.Drinks,
    RecipeCategory.Snacks,
    RecipeCategory.Unknown
] as const;

export const RecipeDtoSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required and cannot be empty'),
    description: z.string().min(1, 'Name is required and cannot be empty'),
    ingredients: z.array(z.string()),
    category: z.enum(RecipeCategoryValues)
});

export const CreateRecipeDtoSchema = RecipeDtoSchema.omit({
    id: true
});
export const UpdateRecipeDtoSchema = RecipeDtoSchema.omit({
    id: true
});

export type RecipeDto = z.infer<typeof RecipeDtoSchema>;
export type CreateRecipeDto = z.infer<typeof CreateRecipeDtoSchema>;
export type UpdateRecipeDto = z.infer<typeof UpdateRecipeDtoSchema>;
