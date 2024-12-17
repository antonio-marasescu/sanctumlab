import { z } from 'zod';

export const IngredientDtoSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required and cannot be empty'),
    quantity: z.number().default(0),
    icon: z.string()
});

export const CreateIngredientDtoSchema = IngredientDtoSchema.omit({
    id: true
});
export const UpdateIngredientDtoSchema = IngredientDtoSchema.omit({
    id: true
});

export type IngredientDto = z.infer<typeof IngredientDtoSchema>;
export type CreateIngredientDto = z.infer<typeof CreateIngredientDtoSchema>;
export type UpdateIngredientDto = z.infer<typeof UpdateIngredientDtoSchema>;
