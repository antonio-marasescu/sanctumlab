import { AuthFeatureName, AuthRoutes } from '@sanctumlab/fe/auth';

export enum AppFeatureRoutes {
    MENU = 'menu',
    AUTH = AuthFeatureName
}

export enum MenuFeatureRoutes {
    COCKTAILS = 'cocktails',
    SNACKS = 'snacks'
}

export enum AuthFeatureRoutes {
    LOGIN = AuthRoutes.LOGIN,
    LOGIN_ADMIN = AuthRoutes.LOGIN_ADMIN
}
