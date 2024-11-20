import {
    productsInitialState,
    ProductsState,
    ProductsStateFeatureName
} from '../products/products.reducers';
import {
    notificationsInitialState,
    NotificationsState,
    NotificationsStateFeatureName
} from '../notifications/notifications.reducers';

export const createMockDataAccessInitialState = (
    overwriteValues: Partial<{
        products: ProductsState;
        notifications: NotificationsState;
    }> = {}
) => ({
    [ProductsStateFeatureName]: productsInitialState,
    [NotificationsStateFeatureName]: notificationsInitialState,
    ...overwriteValues
});
