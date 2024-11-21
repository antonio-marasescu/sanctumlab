import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import {
    AttributeType,
    BillingMode,
    ProjectionType,
    Table
} from 'aws-cdk-lib/aws-dynamodb';
import { TABLE_NAME } from './config/dynamodb.config';
import { InfrastructureStackProps } from '../../shared/types/infrastructure-stack.types';

export function createPersistenceStack(
    stack: cdk.Stack,
    props: InfrastructureStackProps
): Table {
    const table = new Table(stack, TABLE_NAME(props), {
        partitionKey: { name: 'pk', type: AttributeType.STRING },
        sortKey: { name: 'sk', type: AttributeType.STRING },
        tableName: TABLE_NAME(props),
        billingMode: BillingMode.PAY_PER_REQUEST,
        removalPolicy: RemovalPolicy.DESTROY
    });

    table.addGlobalSecondaryIndex({
        indexName: 'gsi1',
        partitionKey: { name: 'gsi1pk', type: AttributeType.STRING },
        sortKey: { name: 'gsi1sk', type: AttributeType.STRING },
        projectionType: ProjectionType.ALL
    });

    new cdk.CfnOutput(stack, 'DynamoDBTable', {
        value: table.tableName,
        description: 'The dynamodb table name'
    });

    return table;
}
