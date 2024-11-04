import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { InfrastructureStackProps } from '../types/infrastructure-stack.types';
import {
    API_LAMBDA_TIMEOUT,
    DEFAULT_LAMBDA_CODE,
    LAMBDA_HANDLER_NAME
} from '../config/lambda.config';

export function createLambda(
    id: string,
    stack: cdk.Stack,
    props: InfrastructureStackProps,
    environment: Record<string, string> = {},
    filename = 'index',
    handlerName = LAMBDA_HANDLER_NAME
): lambda.Function {
    const lambdaResourceId = `${props.stackConfig.appName}-${id}-lambda-${props.stackConfig.tenantEnv}`;
    const handler = `${filename}.${handlerName}`;
    return new lambda.Function(stack, lambdaResourceId, {
        memorySize: 1024,
        timeout: API_LAMBDA_TIMEOUT,
        runtime: lambda.Runtime.NODEJS_20_X,
        handler,
        code: lambda.Code.fromInline(DEFAULT_LAMBDA_CODE),
        environment
    });
}

export function createLambdaIntegration(
    lambda: lambda.Function
): apigw.LambdaIntegration {
    return new apigw.LambdaIntegration(lambda, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' }
    });
}
