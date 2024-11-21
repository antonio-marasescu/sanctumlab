import { NotificationDto } from '../types/notifications.types';
import dayjs from 'dayjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ExceptionDto } from '@sanctumlab/api-interfaces';

export function createNotification({
    id,
    title,
    message,
    code,
    type
}: Omit<NotificationDto, 'timestamp'>): NotificationDto {
    return {
        id,
        title,
        message,
        code,
        type,
        timestamp: dayjs().date()
    };
}

export function createNotificationHttpError(
    title: string,
    payload: HttpErrorResponse
): NotificationDto {
    const error = payload.error as ExceptionDto;
    return createNotification({
        id: error.id,
        code: error.type,
        title,
        message: error.message,
        type: 'error'
    });
}
