#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';
import { retrieveAppEnvironmentVariables } from './infrastructure-app.utils';

const app = new cdk.App();

const stackConfig = retrieveAppEnvironmentVariables(app);

const stackName = `${stackConfig.appName}-${stackConfig.tenantEnv}-infra-stack`;

new InfrastructureStack(app, stackName, {
    stackConfig
});
