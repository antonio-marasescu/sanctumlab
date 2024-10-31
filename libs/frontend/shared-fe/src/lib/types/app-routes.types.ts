import { AuthFeatureName, AuthRoutes } from '@sanctumlab/fe/auth-fe';

export enum AppFeatureRoutes {
    MENU = 'menu',
    AUTH = AuthFeatureName
}

export enum MenuFeatureRoutes {
    COCKTAILS = 'cocktails',
    SNACKS = 'snacks',
    CREATE = 'create',
    EDIT = 'edit'
}

export enum AuthFeatureRoutes {
    LOGIN = AuthRoutes.LOGIN,
    LOGIN_ADMIN = AuthRoutes.LOGIN_ADMIN
}
