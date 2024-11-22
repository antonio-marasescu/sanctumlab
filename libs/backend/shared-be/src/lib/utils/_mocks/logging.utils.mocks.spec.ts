import { AppLogger } from '../logging.utils';

export const mockAppLogger = () => {
    jest.spyOn(AppLogger, 'log').mockImplementation(jest.fn());
    jest.spyOn(AppLogger, 'info').mockImplementation(jest.fn());
    jest.spyOn(AppLogger, 'warn').mockImplementation(jest.fn());
    jest.spyOn(AppLogger, 'debug').mockImplementation(jest.fn());
    jest.spyOn(AppLogger, 'error').mockImplementation(jest.fn());
};

describe('mockAppLogger', () => {
    it('should be defined', () => {
        expect(mockAppLogger).toBeDefined();
    });
});
