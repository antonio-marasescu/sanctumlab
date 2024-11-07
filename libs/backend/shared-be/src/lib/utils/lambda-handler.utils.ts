import {
    LambdaHandler,
    LambdaRequestPayload,
    LambdaResponsePayload
} from '../types/lambda-handler.types';
import { BaseException } from '../types/exception.types';
import { buildErrorResponse } from './lambda-response.utils';

export async function baseLambdaHandler(
    event: LambdaRequestPayload,
    callback: LambdaHandler
): Promise<LambdaResponsePayload> {
    try {
        return await callback(event);
    } catch (error: unknown) {
        const exception = error as BaseException;
        console.error('Exception occurred', error);
        return buildErrorResponse(exception.statusCode, {
            message: exception.message,
            type: exception.type
        });
    }
}
