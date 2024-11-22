import { Logger } from './logging.utils';

describe('loggingUtils', () => {
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger({ serviceName: 'TestService' });
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'info').mockImplementation();
        jest.spyOn(console, 'warn').mockImplementation();
        jest.spyOn(console, 'debug').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should log messages with log level LOG', () => {
        const message = 'This is a log message';
        const context = { key: 'value' };
        logger.log(message, context);
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('"level":"LOG"')
        );
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('"message":"This is a log message"')
        );
    });

    it('should log messages with log level INFO', () => {
        const message = 'This is an info message';
        logger.info(message);
        expect(console.info).toHaveBeenCalledWith(
            expect.stringContaining('"level":"INFO"')
        );
        expect(console.info).toHaveBeenCalledWith(
            expect.stringContaining('"message":"This is an info message"')
        );
    });

    it('should log messages with log level WARN', () => {
        const message = 'This is a warning';
        logger.warn(message);
        expect(console.warn).toHaveBeenCalledWith(
            expect.stringContaining('"level":"WARN"')
        );
        expect(console.warn).toHaveBeenCalledWith(
            expect.stringContaining('"message":"This is a warning"')
        );
    });

    it('should log messages with log level DEBUG', () => {
        const message = 'This is a debug message';
        logger.debug(message);
        expect(console.debug).toHaveBeenCalledWith(
            expect.stringContaining('"level":"DEBUG"')
        );
        expect(console.debug).toHaveBeenCalledWith(
            expect.stringContaining('"message":"This is a debug message"')
        );
    });

    it('should log messages with log level ERROR', () => {
        const message = 'This is an error message';
        logger.error(message);
        expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('"level":"ERROR"')
        );
        expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('"message":"This is an error message"')
        );
    });

    it('should include the serviceName in all logs', () => {
        const message = 'Test message';
        logger.log(message);
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('"serviceName":"TestService"')
        );
    });

    it('should include the context in the log if provided', () => {
        const message = 'This is a log message';
        const context = { userId: 12345 };
        logger.log(message, context);
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('"context":{"userId":12345}')
        );
    });

    it('should log with default empty context if none is provided', () => {
        const message = 'This is a log message';
        logger.log(message);
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('"context":{}')
        );
    });
});
