import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Cors } from 'aws-cdk-lib/aws-apigateway';
import { AppLambdas } from './config/api-lambda.config';
import {
    API_COGNITO_AUTHORIZER_ID,
    API_GATEWAY_ID
} from './config/api-gateway.config';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { InfrastructureStackProps } from '../../shared/types/infrastructure-stack.types';
import { createLambda } from '../../shared/utils/lambda.utils';
import { createApiModule } from './backend-modules-stack';
import { Duration } from 'aws-cdk-lib/core';

export function createBackendStack(
    stack: cdk.Stack,
    props: InfrastructureStackProps,
    deps: {
        database: Table;
        userPool: UserPool;
        userPoolClient: UserPoolClient;
    },
    enableAuth = true
): apigw.LambdaRestApi {
    const api = createApiGateway(stack, props);
    const authorizer = createAuthorizer(stack, props, {
        userPool: deps.userPool,
        userPoolClient: deps.userPoolClient,
        api
    });

    createApiModule(
        stack,
        props,
        {
            api,
            database: deps.database,
            userPool: deps.userPool,
            authorizer
        },
        enableAuth
    );
    createBackendOutputs(stack, api);

    return api;
}

function createApiGateway(
    stack: cdk.Stack,
    props: InfrastructureStackProps
): apigw.LambdaRestApi {
    const defaultLambda = createLambda(AppLambdas.DEFAULT, stack, props);

    return new apigw.LambdaRestApi(stack, API_GATEWAY_ID(props), {
        restApiName: API_GATEWAY_ID(props),
        description: `The ${props.stackConfig.appName} API for the ${props.stackConfig.tenantEnv} environment.`,
        handler: defaultLambda,
        proxy: false,
        deploy: true,
        defaultCorsPreflightOptions: {
            allowHeaders: [
                'Content-Type',
                'X-Amz-Date',
                'Authorization',
                'X-Api-Key',
                'Access-Control-Allow-Credentials',
                'Access-Control-Allow-Headers',
                'Impersonating-User-Sub'
            ],
            allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowCredentials: true,
            allowOrigins: Cors.ALL_ORIGINS
        }
    });
}

export function createAuthorizer(
    stack: cdk.Stack,
    props: InfrastructureStackProps,
    deps: {
        userPool: UserPool;
        userPoolClient: UserPoolClient;
        api: apigw.LambdaRestApi;
    }
): apigw.TokenAuthorizer {
    const lambdaAuthorizer = createLambda(AppLambdas.AUTHORIZER, stack, props, {
        COGNITO_CLIENT_ID: deps.userPoolClient.userPoolClientId,
        COGNITO_USER_POOL_ID: deps.userPool.userPoolId
    });
    return new apigw.TokenAuthorizer(stack, API_COGNITO_AUTHORIZER_ID(props), {
        handler: lambdaAuthorizer,
        identitySource: 'method.request.header.Authorization',
        resultsCacheTtl: Duration.seconds(0)
    });
}

function createBackendOutputs(
    stack: cdk.Stack,
    api: apigw.LambdaRestApi
): void {
    new cdk.CfnOutput(stack, 'ApiGatewayEndpoint', {
        value: api.url,
        description: 'The Api Gateway url endpoint'
    });
}
