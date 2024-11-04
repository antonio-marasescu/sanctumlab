import { InfrastructureStackProps } from '../../../shared/types/infrastructure-stack.types';

export const API_GATEWAY_ID = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-api-${props.stackConfig.tenantEnv}`;

export const API_COGNITO_AUTHORIZER_ID = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-authorizer-${props.stackConfig.tenantEnv}`;
