const DynamoDBTableId: string =
    process.env['DYNAMODB_TABLE_ID'] || 'default-db';

const DynamoDBClientEndpoint: string | undefined =
    process.env['DYNAMODB_CLIENT_ENDPOINT'] !== 'undefined'
        ? process.env['DYNAMODB_CLIENT_ENDPOINT']
        : undefined;

const DynamoDBClientRegion: string | undefined =
    process.env['DYNAMODB_CLIENT_REGION'] !== 'undefined'
        ? process.env['DYNAMODB_CLIENT_REGION']
        : undefined;

export const DatabaseConfig = {
    tableId: DynamoDBTableId,
    endpoint: DynamoDBClientEndpoint,
    region: DynamoDBClientRegion
};
