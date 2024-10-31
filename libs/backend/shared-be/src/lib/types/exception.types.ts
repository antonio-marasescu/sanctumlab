export enum ExceptionType {
    INVALID_PAYLOAD = 'INVALID_PAYLOAD',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND'
}

export interface BaseException {
    statusCode: number;
    type: ExceptionType;
    message: string;
}

export class NotAuthorizedException extends Error implements BaseException {
    readonly statusCode = 403;
    readonly type = ExceptionType.FORBIDDEN;

    constructor(values?: Pick<NotAuthorizedException, 'message'>) {
        super(values?.message || 'Invalid access rights');
    }
}

export class InvalidPayloadException extends Error implements BaseException {
    readonly statusCode = 400;
    readonly type = ExceptionType.INVALID_PAYLOAD;

    constructor(values?: Pick<InvalidPayloadException, 'message'>) {
        super(values?.message || 'The payload data was malformed');
    }
}

export class NotFoundException extends Error implements BaseException {
    readonly statusCode = 404;
    readonly type = ExceptionType.NOT_FOUND;

    constructor(values?: Pick<NotFoundException, 'message'>) {
        super(values?.message || 'The requested data could not be found');
    }
}

export type ExceptionUnion =
    | NotAuthorizedException
    | InvalidPayloadException
    | NotFoundException;
