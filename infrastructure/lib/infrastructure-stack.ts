import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { InfrastructureStackProps } from './shared/types/infrastructure-stack.types';
import { createSecurityStack } from './stacks/security/security-stack';

export class InfrastructureStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: InfrastructureStackProps) {
        super(scope, id, props);

        createSecurityStack(this, props, { cfnDomainName: null });
    }
}
