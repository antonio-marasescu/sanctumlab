import { ProductItemCategoryDomain } from '../enums/products-enums.domain';

export const ProductsTableName = 'Products';

export const ProductsTable = {
    pk: 'PRODUCTS',
    sk: 'PRODUCTS#${id}'
};

export const ProductsTableSchema = {
    pk: { type: String, value: ProductsTable.pk },
    sk: { type: String, value: ProductsTable.sk },
    id: {
        type: String,
        generate: 'ulid',
        required: true
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: Object.values(ProductItemCategoryDomain)
    },
    recipe: { type: String, required: true },
    tags: {
        type: Array,
        default: [],
        items: {
            type: String
        },
        required: true
    },
    available: { type: Boolean, required: true },
    created: { type: String, required: false },
    updated: { type: String, required: false }
};
