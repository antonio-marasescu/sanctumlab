import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Cors } from 'aws-cdk-lib/aws-apigateway';
import { AppLambdas } from './config/api-lambda.config';
import {
    API_COGNITO_AUTHORIZER_ID,
    API_GATEWAY_ID
} from './config/api-gateway.config';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { InfrastructureStackProps } from '../../shared/types/infrastructure-stack.types';
import { createLambda } from '../../shared/utils/lambda.utils';
import { createApiModule } from './backend-modules-stack';

export function createBackendStack(
    stack: cdk.Stack,
    props: InfrastructureStackProps,
    deps: {
        database: Table;
        userPool: UserPool;
    },
    useAuthorizer = true
): apigw.LambdaRestApi {
    const api = createApiGateway(stack, props);
    const authorizer = createAuthorizer(stack, props, deps.userPool, api);

    createApiModule(
        stack,
        props,
        {
            api,
            database: deps.database,
            userPool: deps.userPool,
            authorizer
        },
        useAuthorizer
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
    userPool: UserPool,
    api: apigw.LambdaRestApi
): apigw.CfnAuthorizer {
    return new apigw.CfnAuthorizer(stack, API_COGNITO_AUTHORIZER_ID(props), {
        restApiId: api.restApiId,
        type: 'COGNITO_USER_POOLS',
        name: API_COGNITO_AUTHORIZER_ID(props),
        providerArns: [userPool.userPoolArn],
        identitySource: 'method.request.header.Authorization'
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
