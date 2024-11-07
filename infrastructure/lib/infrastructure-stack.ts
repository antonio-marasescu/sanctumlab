import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { InfrastructureStackProps } from './shared/types/infrastructure-stack.types';
import { createSecurityStack } from './stacks/security/security-stack';
import { createPersistenceStack } from './stacks/persistance/persistance-stack';
import { createBackendStack } from './stacks/backend/backend-stack';
import {
    ENVIRONMENT_TAG_NAME,
    PROJECT_TAG_NAME
} from './shared/config/infrastructure.config';
import { createFrontendStack } from './stacks/frontend/frontend-stack';

export class InfrastructureStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: InfrastructureStackProps) {
        super(scope, id, props);

        const database = createPersistenceStack(this, props);
        const { userPool, userPoolClient } = createSecurityStack(this, props, {
            cfnDomainName: null
        });
        createBackendStack(this, props, {
            database,
            userPool,
            userPoolClient
        });
        createFrontendStack(this, props);

        Tags.of(this).add(PROJECT_TAG_NAME, props.stackConfig.appName);
        Tags.of(this).add(ENVIRONMENT_TAG_NAME, props.stackConfig.tenantEnv);
    }
}
