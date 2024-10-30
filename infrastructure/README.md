# Sanctum Lab Infrastructure

This is the infrastructure code for deploying the Sanctum Lab application to AWS.

## Useful commands

-   `cdk deploy -c appName=sanctumlab -c tenantEnv=dev` Deploy CDK for Dev environment
-   `cdk deploy -c appName=sanctumlab -c tenantEnv=prod` Deploy CDK for Prod environment
-   `cdk context --clear` Clear CDK context
-   `aws cognito-idp admin-set-user-password --user-pool-id <user_pool_id> --username <your_user> --password <new_password> --permanent` Force change a user password and confirm his status
