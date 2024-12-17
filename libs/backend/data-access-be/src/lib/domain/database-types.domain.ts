import { Entity } from 'dynamodb-onetable';
import DatabaseSchema from './database-schema.domain';

export type ProductModel = Entity<typeof DatabaseSchema.models.Products>;
export type IngredientModel = Entity<typeof DatabaseSchema.models.Ingredients>;
export type RecipeModel = Entity<typeof DatabaseSchema.models.Recipes>;
