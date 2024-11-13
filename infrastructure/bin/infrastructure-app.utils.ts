import { InfraEnvironmentVariable } from './infrastructure-app.types';
import * as cdk from 'aws-cdk-lib';
import { InfraStackConfig } from '../lib/shared/types/infrastructure-stack.types';

export function retrieveAppEnvironmentVariables(
    app: cdk.App
): InfraStackConfig {
    const appName =
        app.node.tryGetContext(InfraEnvironmentVariable.appName) ??
        process.env[InfraEnvironmentVariable.appName];
    const tenantEnv =
        app.node.tryGetContext(InfraEnvironmentVariable.tenantEnv) ??
        process.env[InfraEnvironmentVariable.tenantEnv];
    const production =
        app.node.tryGetContext(InfraEnvironmentVariable.production) ??
        process.env[InfraEnvironmentVariable.production];
    const domainName =
        app.node.tryGetContext(InfraEnvironmentVariable.domainName) ??
        process.env[InfraEnvironmentVariable.domainName];
    const certificateArn =
        app.node.tryGetContext(InfraEnvironmentVariable.certificateArn) ??
        process.env[InfraEnvironmentVariable.certificateArn];

    return {
        appName,
        tenantEnv,
        production: production === 'true',
        domainName: domainName ?? null,
        certificateArn: certificateArn ?? null
    };
}
