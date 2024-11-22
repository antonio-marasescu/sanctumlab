import {
    NotAuthorizedException,
    InvalidPayloadException,
    NotFoundException,
    BaseException
} from './exception.types';
import { ExceptionType } from '@sanctumlab/api-interfaces';

describe('Exception Classes', () => {
    describe('NotAuthorizedException', () => {
        it('should have default properties', () => {
            const exception = new NotAuthorizedException();
            expect(exception.statusCode).toBe(403);
            expect(exception.type).toBe(ExceptionType.FORBIDDEN);
            expect(exception.message).toBe('Invalid access rights');
        });

        it('should allow overriding the message', () => {
            const customMessage = 'Custom not authorized message';
            const exception = new NotAuthorizedException({
                message: customMessage
            });
            expect(exception.message).toBe(customMessage);
        });
    });

    describe('InvalidPayloadException', () => {
        it('should have default properties', () => {
            const exception = new InvalidPayloadException();
            expect(exception.statusCode).toBe(400);
            expect(exception.type).toBe(ExceptionType.INVALID_PAYLOAD);
            expect(exception.message).toBe('The payload data was malformed');
        });

        it('should allow overriding the message', () => {
            const customMessage = 'Custom invalid payload message';
            const exception = new InvalidPayloadException({
                message: customMessage
            });
            expect(exception.message).toBe(customMessage);
        });
    });

    describe('NotFoundException', () => {
        it('should have default properties', () => {
            const exception = new NotFoundException();
            expect(exception.statusCode).toBe(404);
            expect(exception.type).toBe(ExceptionType.NOT_FOUND);
            expect(exception.message).toBe(
                'The requested data could not be found'
            );
        });

        it('should allow overriding the message', () => {
            const customMessage = 'Custom not found message';
            const exception = new NotFoundException({ message: customMessage });
            expect(exception.message).toBe(customMessage);
        });
    });

    describe('BaseException', () => {
        it('should not be instantiated directly', () => {
            expect(() => {
                throw new BaseException();
            }).toThrow();
        });
    });
});
