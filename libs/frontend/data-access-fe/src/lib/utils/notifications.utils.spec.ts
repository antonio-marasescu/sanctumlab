import {
    createNotification,
    createNotificationHttpError
} from './notifications.utils';
import { createMockNotification } from '../types/_mocks/notifications.types.mocks';
import dayjs from 'dayjs';
import { HttpErrorResponse } from '@angular/common/http';
import { createMockNotFoundException } from '@sanctumlab/api-interfaces';

describe('NotificationUtils', () => {
    it('should create a notification', () => {
        const expected = createMockNotification();
        expected.timestamp = dayjs().date();
        const response = createNotification(expected);
        expect(response).toEqual(expected);
    });

    it('should create a error notification', () => {
        const error = createMockNotFoundException();
        const payload = new HttpErrorResponse({
            error
        });
        const expected = createMockNotification({
            id: error.id,
            code: error.type,
            message: error.message,
            title: 'Not Found',
            type: 'error'
        });
        expected.timestamp = dayjs().date();

        const response = createNotificationHttpError(expected.title, payload);
        expect(response).toEqual(expected);
    });
});
