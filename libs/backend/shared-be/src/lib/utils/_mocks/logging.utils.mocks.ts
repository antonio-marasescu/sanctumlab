import { AppLogger } from '../logging.utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockAppLogger = (jest: any) => {
    jest.spyOn(AppLogger, 'log').mockImplementation(jest.fn());
    jest.spyOn(AppLogger, 'info').mockImplementation(jest.fn());
    jest.spyOn(AppLogger, 'warn').mockImplementation(jest.fn());
    jest.spyOn(AppLogger, 'debug').mockImplementation(jest.fn());
    jest.spyOn(AppLogger, 'error').mockImplementation(jest.fn());
};
