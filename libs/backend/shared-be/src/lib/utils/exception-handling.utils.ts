import { BaseException } from '../types/exception.types';
import { ExceptionDto, ExceptionType } from '@sanctumlab/api-interfaces';
import { ZodError } from 'zod';

export function handleException(error: unknown): ExceptionDto {
    if (error instanceof ZodError) {
        const exception = error as ZodError;
        return {
            id: crypto.randomUUID(),
            statusCode: 400,
            message: exception.message,
            type: ExceptionType.INVALID_PAYLOAD
        };
    }
    if (error instanceof BaseException) {
        const exception = error as BaseException;
        return {
            id: crypto.randomUUID(),
            statusCode: exception.statusCode,
            message: exception.message,
            type: exception.type
        };
    }
    const exception = error as Error;
    return {
        id: crypto.randomUUID(),
        statusCode: 500,
        message: exception.message,
        type: ExceptionType.UNKNOWN
    };
}
