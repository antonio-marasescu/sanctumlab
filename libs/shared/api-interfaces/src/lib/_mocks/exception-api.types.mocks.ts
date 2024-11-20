import { ExceptionDto, ExceptionType } from '../exception-api.types';

export const createMockInvalidPayloadException = (
    overwriteValues: Partial<ExceptionDto> = {}
): ExceptionDto => ({
    id: 'invalid-payload-exception',
    statusCode: 400,
    message: 'Invalid Payload Exception',
    type: ExceptionType.INVALID_PAYLOAD,
    ...overwriteValues
});

export const createMockForbiddenException = (
    overwriteValues: Partial<ExceptionDto> = {}
): ExceptionDto => ({
    id: 'forbidden-exception',
    statusCode: 401,
    message: 'Forbidden Exception',
    type: ExceptionType.FORBIDDEN,
    ...overwriteValues
});

export const createMockNotFoundException = (
    overwriteValues: Partial<ExceptionDto> = {}
): ExceptionDto => ({
    id: 'not-found-exception',
    statusCode: 404,
    message: 'Not Found Exception',
    type: ExceptionType.NOT_FOUND,
    ...overwriteValues
});

export const createMockUnknownException = (
    overwriteValues: Partial<ExceptionDto> = {}
): ExceptionDto => ({
    id: 'unknown-exception',
    statusCode: 500,
    message: 'Unknown Exception',
    type: ExceptionType.UNKNOWN,
    ...overwriteValues
});
