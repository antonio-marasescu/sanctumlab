import { StackProps } from 'aws-cdk-lib/core/lib/stack';

export type InfraStackConfig = {
    appName: string;
    tenantEnv: string;
    production: boolean;
    domainName: string | null;
    certificateArn: string | null;
};

export interface InfrastructureStackProps extends StackProps {
    stackConfig: InfraStackConfig;
}
