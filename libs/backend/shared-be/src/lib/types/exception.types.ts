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

export class NotAuthorizedException implements BaseException {
    readonly statusCode = 403;
    readonly type = ExceptionType.FORBIDDEN;
    message = 'Invalid access rights';

    constructor(values?: Pick<NotAuthorizedException, 'message'>) {
        if (values) {
            this.message = values.message;
        }
    }
}

export class InvalidPayloadException implements BaseException {
    readonly statusCode = 400;
    readonly type = ExceptionType.INVALID_PAYLOAD;
    message = 'The payload data was malformed';

    constructor(values?: Pick<InvalidPayloadException, 'message'>) {
        if (values) {
            this.message = values.message;
        }
    }
}

export class NotFoundException implements BaseException {
    readonly statusCode = 404;
    readonly type = ExceptionType.NOT_FOUND;
    message = 'The requested data could not be found';

    constructor(values?: Pick<NotFoundException, 'message'>) {
        if (values) {
            this.message = values.message;
        }
    }
}

export type ExceptionUnion =
    | NotAuthorizedException
    | InvalidPayloadException
    | NotFoundException;
