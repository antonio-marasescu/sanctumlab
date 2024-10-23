import { StackProps } from 'aws-cdk-lib/core/lib/stack';

export interface InfrastructureStackProps extends StackProps {
    stackConfig: {
        appName: string;
        tenantEnv: string;
    };
}
