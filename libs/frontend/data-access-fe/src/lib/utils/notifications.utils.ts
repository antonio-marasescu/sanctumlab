import { NotificationDto } from '../types/notifications.types';
import dayjs from 'dayjs';
import { HttpErrorResponse } from '@angular/common/http';

export function createNotification({
    title,
    message,
    type
}: Omit<NotificationDto, 'id' | 'timestamp'>): NotificationDto {
    return {
        id: crypto.randomUUID(),
        title,
        message,
        type,
        timestamp: dayjs().date()
    };
}

export function createNotificationHttpError(
    title: string,
    error: HttpErrorResponse
): NotificationDto {
    return createNotification({ title, message: error.message, type: 'error' });
}
