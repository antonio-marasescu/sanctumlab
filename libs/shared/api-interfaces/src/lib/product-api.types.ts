export enum ProductItemCategory {
    Cocktail = 'Cocktail',
    Snacks = 'Snacks'
}

export type ProductItemDto = {
    id: string;
    name: string;
    description: string;
    category: ProductItemCategory;
    recipe: string;
    tags: string[];
    available: boolean;
};

export type CreateProductItemDto = Omit<ProductItemDto, 'id' | 'available'>;
export type UpdateProductItemDto = Omit<ProductItemDto, 'id'>;
