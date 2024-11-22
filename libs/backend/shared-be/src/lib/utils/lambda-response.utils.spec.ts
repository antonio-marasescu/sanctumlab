import {
    buildErrorResponse,
    buildOkResponse,
    buildPathNotFoundResponse
} from './lambda-response.utils';

describe('lambdaResponseUtils', () => {
    it('should build a 404 Path Not Found response', () => {
        const response = buildPathNotFoundResponse();
        expect(response).toEqual({
            statusCode: 404,
            headers: expect.objectContaining({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers':
                    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials': true
            }),
            body: JSON.stringify({ message: 'Resource Not Found' })
        });
    });

    it('should build a 200 OK response with a body', () => {
        const body = { message: 'Success' };
        const response = buildOkResponse(body);
        expect(response).toEqual({
            statusCode: 200,
            headers: expect.objectContaining({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers':
                    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials': true
            }),
            body: JSON.stringify(body)
        });
    });

    it('should build an error response with a custom status code and body', () => {
        const statusCode = 500;
        const body = { error: 'Internal Server Error' };
        const response = buildErrorResponse(statusCode, body);
        expect(response).toEqual({
            statusCode: 500,
            headers: expect.objectContaining({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers':
                    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials': true
            }),
            body: JSON.stringify(body)
        });
    });
});
