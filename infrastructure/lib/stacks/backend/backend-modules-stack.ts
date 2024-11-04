import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { InfrastructureStackProps } from '../../shared/types/infrastructure-stack.types';
import {
    createLambda,
    createLambdaIntegration
} from '../../shared/utils/lambda.utils';
import { AppLambdas } from './config/api-lambda.config';

export function createApiModule(
    stack: cdk.Stack,
    props: InfrastructureStackProps,
    deps: {
        api: apigw.LambdaRestApi;
        database: Table;
        userPool: UserPool;
        authorizer: apigw.CfnAuthorizer;
    },
    useAuthorizer: boolean
): void {
    const authorizationOptions = useAuthorizer
        ? {
              authorizationType: apigw.AuthorizationType.COGNITO,
              authorizer: {
                  authorizerId: deps.authorizer.ref
              }
          }
        : undefined;

    const lambda = createLambda(AppLambdas.API, stack, props, {
        DYNAMODB_TABLE_ID: deps.database.tableName,
        DYNAMODB_CLIENT_REGION: stack.region
    });
    deps.database.grantReadWriteData(lambda);

    const productsResource = deps.api.root.addResource('products');
    productsResource.addMethod(
        'POST',
        createLambdaIntegration(lambda),
        authorizationOptions
    );
    productsResource.addMethod(
        'GET',
        createLambdaIntegration(lambda),
        authorizationOptions
    );

    const productsByIdResource = productsResource.addResource('{id}');
    productsByIdResource.addMethod(
        'PUT',
        createLambdaIntegration(lambda),
        authorizationOptions
    );
    productsByIdResource.addMethod(
        'DELETE',
        createLambdaIntegration(lambda),
        authorizationOptions
    );
    productsByIdResource.addMethod(
        'GET',
        createLambdaIntegration(lambda),
        authorizationOptions
    );
}
