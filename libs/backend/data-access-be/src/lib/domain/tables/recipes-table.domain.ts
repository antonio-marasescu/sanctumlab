import { RecipeCategoryDomain } from '../enums/recipes-enums.domain';

export const RecipesTableName = 'Recipes';

export const RecipesTable = {
    pk: 'RECIPES',
    sk: 'RECIPES#${id}'
};

export const RecipesTableSchema = {
    pk: { type: String, value: RecipesTable.pk },
    sk: { type: String, value: RecipesTable.sk },
    id: {
        type: String,
        generate: 'ulid',
        required: true
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: {
        type: Array,
        default: [],
        items: {
            type: String
        },
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(RecipeCategoryDomain)
    },
    created: { type: String, required: false },
    updated: { type: String, required: false }
};
