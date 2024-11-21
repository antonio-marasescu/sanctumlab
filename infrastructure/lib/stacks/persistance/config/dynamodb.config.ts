import { InfrastructureStackProps } from '../../../shared/types/infrastructure-stack.types';

export const TABLE_NAME = (props: InfrastructureStackProps) =>
    `${props.stackConfig.appName}-tabledb-${props.stackConfig.tenantEnv}`;
