import { ExceptionType } from '@sanctumlab/api-interfaces';

export class BaseException extends Error {
    readonly statusCode!: number;
    readonly type!: ExceptionType;
    override message!: string;
}

export class NotAuthorizedException extends BaseException {
    override readonly statusCode = 403;
    override readonly type = ExceptionType.FORBIDDEN;

    constructor(values?: Pick<NotAuthorizedException, 'message'>) {
        super(values?.message ?? 'Invalid access rights');
    }
}

export class InvalidPayloadException extends BaseException {
    override readonly statusCode = 400;
    override readonly type = ExceptionType.INVALID_PAYLOAD;

    constructor(values?: Pick<InvalidPayloadException, 'message'>) {
        super(values?.message ?? 'The payload data was malformed');
    }
}

export class NotFoundException extends BaseException {
    override readonly statusCode = 404;
    override readonly type = ExceptionType.NOT_FOUND;

    constructor(values?: Pick<NotFoundException, 'message'>) {
        super(values?.message ?? 'The requested data could not be found');
    }
}
