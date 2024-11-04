import { LambdaResponsePayload } from '../types/lambda-handler.types';

export const buildPathNotFoundResponse = (
    path: string
): LambdaResponsePayload => ({
    statusCode: 404,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ message: 'Not Found: ' + path })
});

export const buildOkResponse = (body: object): LambdaResponsePayload => ({
    statusCode: 200,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
});
