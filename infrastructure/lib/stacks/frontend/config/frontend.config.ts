import { InfrastructureStackProps } from '../../../shared/types/infrastructure-stack.types';

export const WEBSITE_BUCKET_ID = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-website-${props.stackConfig.tenantEnv}`;

export const ORIGIN_ACCESS_IDENTITY_ID = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-oai-${props.stackConfig.tenantEnv}`;

export const CLOUDFRONT_DISTRIBUTION_ID = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-cf-distribution-${props.stackConfig.tenantEnv}`;
