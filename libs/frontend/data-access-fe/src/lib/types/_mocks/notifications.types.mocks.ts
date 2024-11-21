import { NotificationDto } from '../notifications.types';

export const createMockNotification = (
    overwriteValues: Partial<NotificationDto> = {}
): NotificationDto => ({
    id: '1',
    title: 'Account Created',
    message: 'Your account has been successfully created.',
    code: 'ACC_001',
    type: 'success',
    timestamp: 1692619023000,
    ...overwriteValues
});
