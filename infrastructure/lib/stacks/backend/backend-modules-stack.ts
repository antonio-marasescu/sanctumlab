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
import { ApiRestResourceConfig } from './types/api-modules.types';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { API_REST_CONFIG } from './config/api-modules.config';

export function createApiModule(
    stack: cdk.Stack,
    props: InfrastructureStackProps,
    deps: {
        api: apigw.LambdaRestApi;
        database: Table;
        userPool: UserPool;
        authorizer: apigw.TokenAuthorizer;
    },
    enableAuth: boolean
): void {
    const authorizationOptions: apigw.MethodOptions | undefined = enableAuth
        ? {
              authorizationType: apigw.AuthorizationType.CUSTOM,
              authorizer: deps.authorizer
          }
        : undefined;

    const apiLambda = createLambda(AppLambdas.API, stack, props, {
        DYNAMODB_TABLE_ID: deps.database.tableName,
        DYNAMODB_CLIENT_REGION: stack.region
    });
    deps.database.grantReadWriteData(apiLambda);
    addApiResources(
        deps.api.root,
        API_REST_CONFIG,
        authorizationOptions,
        apiLambda
    );
}

function addApiResources(
    parentResource: apigw.IResource,
    config: ApiRestResourceConfig,
    authorizationOptions: apigw.MethodOptions | undefined,
    mainLambda: lambda.Function
): void {
    Object.entries(config).forEach(([resourcePath, resourceConfig]) => {
        const resource = parentResource.addResource(resourcePath);

        resourceConfig.methods.forEach(method => {
            resource.addMethod(
                method,
                createLambdaIntegration(mainLambda),
                authorizationOptions
            );
        });

        if (resourceConfig.subResources) {
            addApiResources(
                resource,
                resourceConfig.subResources,
                authorizationOptions,
                mainLambda
            );
        }
    });
}
