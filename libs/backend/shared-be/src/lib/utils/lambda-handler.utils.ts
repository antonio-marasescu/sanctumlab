import {
    LambdaHandler,
    LambdaRequestPayload,
    LambdaResponsePayload
} from '../types/lambda-handler.types';
import { buildErrorResponse } from './lambda-response.utils';
import { AppLogger } from './logging.utils';
import { handleException } from './exception-handling.utils';

export async function baseLambdaHandler(
    event: LambdaRequestPayload,
    callback: LambdaHandler
): Promise<LambdaResponsePayload> {
    try {
        return await callback(event);
    } catch (error: unknown) {
        AppLogger.error('Exception occurred', { error });
        const exception = handleException(error);
        return buildErrorResponse(exception.statusCode, exception);
    }
}
