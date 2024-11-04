import { DatabaseConfig } from '../config/database-environment.config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import DatabaseSchema from '../domain/database-schema.domain';
import { Model, Table } from 'dynamodb-onetable';
import { ProductsTableName } from '../domain/tables/products-table.domain';
import { ProductModel } from '../domain/database-types.domain';

export class DatabaseClient {
    private readonly client = this.clientFactory();

    private clientFactory(): DynamoDBClient {
        if (DatabaseConfig.localEnv) {
            return new DynamoDBClient({
                region: DatabaseConfig.region,
                endpoint: DatabaseConfig.endpoint
            });
        }
        return new DynamoDBClient({
            region: DatabaseConfig.region,
            endpoint: DatabaseConfig.endpoint,
            credentials: {
                accessKeyId: process.env['AWS_ACCESS_KEY_ID'] || '',
                secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'] || '',
                sessionToken: process.env['AWS_SESSION_TOKEN'] || ''
            }
        });
    }

    private readonly databaseTable = new Table({
        client: this.client,
        name: DatabaseConfig.tableId,
        schema: DatabaseSchema,
        partial: false
    });

    public get productsTable(): Model<ProductModel> {
        return this.databaseTable.getModel(ProductsTableName);
    }
}

export const DatabaseClientInstance = new DatabaseClient();
