export type NotificationDto = {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'neutral';
    timestamp: number;
};
