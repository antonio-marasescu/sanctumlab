import { z } from 'zod';

export enum ProductItemCategory {
    Cocktail = 'Cocktail',
    Snacks = 'Snacks',
    Unknown = 'Unknown'
}

export const ProductItemCategoryValues = [
    ProductItemCategory.Cocktail,
    ProductItemCategory.Snacks,
    ProductItemCategory.Unknown
] as const;

export const ProductItemDtoSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    category: z.enum(ProductItemCategoryValues),
    recipe: z.string(),
    tags: z.array(z.string()),
    available: z.boolean()
});

export const CreateProductItemDtoSchema = ProductItemDtoSchema.omit({
    id: true
});
export const UpdateProductItemDtoSchema = ProductItemDtoSchema.omit({
    id: true
});

export type ProductItemDto = z.infer<typeof ProductItemDtoSchema>;
export type CreateProductItemDto = z.infer<typeof CreateProductItemDtoSchema>;
export type UpdateProductItemDto = z.infer<typeof UpdateProductItemDtoSchema>;
