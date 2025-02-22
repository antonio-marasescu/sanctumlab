import { ProductsTableSchema } from './tables/products-table.domain';
import { IngredientsTableSchema } from './tables/ingredients-table.domain';
import { RecipesTableSchema } from './tables/recipes-table.domain';

export const GSI1 = 'gsi1';

const DatabaseSchema = {
    format: 'onetable:1.1.0',
    version: '0.0.1',
    indexes: {
        primary: { hash: 'pk', sort: 'sk' },
        gsi1: { hash: `${GSI1}pk`, sort: `${GSI1}sk`, follow: true }
    },
    models: {
        Products: { ...ProductsTableSchema },
        Ingredients: { ...IngredientsTableSchema },
        Recipes: { ...RecipesTableSchema }
    },
    params: {
        isoDates: true,
        timestamps: true,
        separator: '#'
    }
};

export default DatabaseSchema;
