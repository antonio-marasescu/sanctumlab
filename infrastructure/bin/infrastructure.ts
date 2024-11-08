#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();

const appName = app.node.tryGetContext('appName') || process.env.appName;
const tenantEnv = app.node.tryGetContext('tenantEnv') || process.env.tenantEnv;
const production =
    app.node.tryGetContext('production') || process.env.production;

new InfrastructureStack(app, 'SanctumLabInfraStack', {
    stackConfig: {
        appName,
        tenantEnv,
        production: production === 'true'
    }
});
