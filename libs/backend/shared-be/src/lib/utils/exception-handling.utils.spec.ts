import { ZodError } from 'zod';
import { ExceptionDto, ExceptionType } from '@sanctumlab/api-interfaces';
import { handleException } from './exception-handling.utils';
import { BaseException } from '../types/exception.types';

describe('handleException', () => {
    const mockUUID = 'b65c55d0-07fe-40d7-84fe-b2231d0f2b8f';

    beforeEach(() => {
        jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID);
    });

    it('should handle ZodError correctly', () => {
        const zodError = new ZodError([
            {
                code: 'custom',
                path: ['./path-to-error/'],
                message: 'Invalid payload'
            }
        ]);

        const result: ExceptionDto = handleException(zodError);

        expect(result).toEqual({
            id: mockUUID,
            statusCode: 400,
            message:
                '[\n  {\n    "code": "custom",\n    "path": [\n      "./path-to-error/"\n    ],\n    "message": "Invalid payload"\n  }\n]',
            type: ExceptionType.INVALID_PAYLOAD
        });
    });

    it('should handle BaseException correctly', () => {
        class CustomException extends BaseException {
            override statusCode = 404;
            override type = ExceptionType.NOT_FOUND;
            constructor(message: string) {
                super(message);
            }
        }
        const baseException = new CustomException('Not found');

        const result: ExceptionDto = handleException(baseException);

        expect(result).toEqual({
            id: mockUUID,
            statusCode: 404,
            message: 'Not found',
            type: ExceptionType.NOT_FOUND
        });
    });

    it('should handle unknown errors correctly', () => {
        const unknownError = new Error('Something went wrong');

        const result: ExceptionDto = handleException(unknownError);

        expect(result).toEqual({
            id: mockUUID,
            statusCode: 500,
            message: 'Something went wrong',
            type: ExceptionType.UNKNOWN
        });
    });
});
