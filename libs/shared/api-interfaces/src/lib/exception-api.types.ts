export enum ExceptionType {
    INVALID_PAYLOAD = 'INVALID_PAYLOAD',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    UNKNOWN = 'UNKNOWN'
}

export type ExceptionDto = {
    id: string;
    statusCode: number;
    message: string;
    type: ExceptionType;
};
