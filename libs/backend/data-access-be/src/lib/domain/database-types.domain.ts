import { Entity } from 'dynamodb-onetable';
import DatabaseSchema from './database-schema.domain';

export type ProductModel = Entity<typeof DatabaseSchema.models.Products>;
