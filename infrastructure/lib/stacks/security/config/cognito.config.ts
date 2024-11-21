import { InfrastructureStackProps } from '../../../shared/types/infrastructure-stack.types';

export const COGNITO_USER_POOL_ID = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-user-pool-${props.stackConfig.tenantEnv}`;

export const COGNITO_USER_POOL_CLIENT_ID = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-user-pool-client-${props.stackConfig.tenantEnv}`;

export const COGNITO_USER_POOL_DOMAIN_ID = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-user-pool-domain-${props.stackConfig.tenantEnv}`;

export const COGNITO_USER_POOL_DOMAIN_PREFIX = (
    props: InfrastructureStackProps
) => `${props.stackConfig.appName}-${props.stackConfig.tenantEnv}`;

export const COGNITO_USER_POOL_RESOURCE_SERVER = (
    props: InfrastructureStackProps
) =>
    `${props.stackConfig.appName}-user-pool-resource-server-${props.stackConfig.tenantEnv}`;

export const COGNITO_USER_POOL_ADMIN_GROUP = (
    props: InfrastructureStackProps
) =>
    `${props.stackConfig.appName}-user-pool-admin-group-${props.stackConfig.tenantEnv}`;
