import { LambdaResponsePayload } from '../types/lambda-handler.types';

const genericResponseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Credentials': true
};

export const buildPathNotFoundResponse = (): LambdaResponsePayload => ({
    statusCode: 404,
    headers: genericResponseHeaders,
    body: JSON.stringify({ message: 'Resource Not Found' })
});

export const buildOkResponse = (body: object): LambdaResponsePayload => ({
    statusCode: 200,
    headers: genericResponseHeaders,
    body: JSON.stringify(body)
});

export const buildErrorResponse = (
    statusCode: number,
    body: object
): LambdaResponsePayload => ({
    statusCode: statusCode,
    headers: genericResponseHeaders,
    body: JSON.stringify(body)
});
