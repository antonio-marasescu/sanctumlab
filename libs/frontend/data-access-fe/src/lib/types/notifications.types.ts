export type NotificationDto = {
    id: string;
    title: string;
    message: string;
    code: string;
    type: 'success' | 'error' | 'neutral';
    timestamp: number;
};
