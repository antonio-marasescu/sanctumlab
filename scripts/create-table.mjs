import { configDotenv } from 'dotenv';
import { execSync } from 'child_process';

configDotenv();

const endpoint = process.env.DYNAMODB_CLIENT_ENDPOINT;
const region = process.env.DYNAMODB_CLIENT_REGION;
const tableName = process.env.DYNAMODB_TABLE_ID || 'default-db';

const attributeDefinitions = [
    'AttributeName=pk,AttributeType=S',
    'AttributeName=sk,AttributeType=S',
    'AttributeName=gsi1pk,AttributeType=S', // GSI partition key
    'AttributeName=gsi1sk,AttributeType=S' // GSI sort key
];

const keySchema = [
    'AttributeName=pk,KeyType=HASH',
    'AttributeName=sk,KeyType=SORT'
];

const globalSecondaryIndexes = [
    `IndexName=gsi1,KeySchema=[{AttributeName=gsi1pk,KeyType=HASH},{AttributeName=gsi1sk,KeyType=SORT}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5}`
];

const createTable = (tableName, endpoint, region) => {
    if (!endpoint) {
        console.error('Endpoint for local creation is missing!');
        process.exit(1);
    }

    try {
        execSync(`aws dynamodb create-table --table-name ${tableName} \
        --attribute-definitions ${attributeDefinitions.join(' ')} \
        --key-schema ${keySchema.join(' ')} \
        --global-secondary-indexes ${globalSecondaryIndexes.join(' ')} \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
        --region ${region} --endpoint-url ${endpoint}`);
        console.log('Table created successfully.');
    } catch (error) {
        console.error('Failed to create table:', error);
        process.exit(1);
    }
};

createTable(tableName, endpoint, region);
