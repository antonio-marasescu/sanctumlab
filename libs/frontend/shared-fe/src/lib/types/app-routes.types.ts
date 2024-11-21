import { AuthFeatureName, AuthRoutes } from '@sanctumlab/fe/auth';

export enum AppFeatureRoutes {
    MENU = 'menu',
    AUTH = AuthFeatureName,
    PROFILE = 'profile'
}

export enum MenuFeatureRoutes {
    COCKTAILS = 'cocktails',
    SNACKS = 'snacks',
    CREATE = 'create',
    EDIT = 'edit'
}

export enum ProfileFeatureRoutes {
    SETTINGS = 'settings'
}

export enum AuthFeatureRoutes {
    LOGIN = AuthRoutes.LOGIN,
    LOGIN_ADMIN = AuthRoutes.LOGIN_ADMIN
}
