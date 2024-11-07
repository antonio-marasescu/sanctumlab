import { Logger } from '@aws-lambda-powertools/logger';

export const AppLogger = new Logger({ serviceName: 'sanctumLab' });
