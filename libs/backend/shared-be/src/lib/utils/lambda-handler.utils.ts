import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { LambdaHandler } from '../types/lambda-handler.types';
import { BaseException } from '../types/exception.types';

export async function baseLambdaHandler(
    event: APIGatewayProxyEvent,
    callback: LambdaHandler
): Promise<APIGatewayProxyResult> {
    try {
        return await callback(event);
    } catch (error: unknown) {
        const exception = error as BaseException;
        console.error('Exception occurred', error);
        return {
            statusCode: exception.statusCode,
            body: JSON.stringify({
                message: exception.message,
                type: exception.type
            })
        };
    }
}
