# Sanctum Lab Infrastructure

This repository contains the infrastructure code for deploying the Sanctum Lab application on AWS. It supports multi-tenancy, enabling deployments across various tenants and environments.

## Useful commands

- `cdk deploy -c appName=sanctumlab -c tenantEnv=dev -c production=false` Deploy CDK for Dev environment
- `cdk deploy -c appName=sanctumlab -c tenantEnv=prod -c production=true -c domainName=<domain_name> -c certificateArn=<arn>` Deploy CDK for Prod environment
- `cdk destroy -c appName=sanctumlab -c tenantEnv=dev -c production=false` Destroy CDK environment for Dev environment
- `cdk destroy -c appName=sanctumlab -c tenantEnv=prod -c production=true` Destroy CDK environment for Prod environment
- `cdk context --clear` Clear CDK context
- `aws cognito-idp admin-set-user-password --user-pool-id <user_pool_id> --username <your_user> --password <new_password> --permanent` Force change a user password and confirm his status
