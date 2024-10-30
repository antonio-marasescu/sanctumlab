import * as cdk from 'aws-cdk-lib';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { InfrastructureStackProps } from '../../shared/types/infrastructure-stack.types';
import {
    CfnUserPoolGroup,
    ClientAttributes,
    UserPool,
    UserPoolClient,
    UserPoolDomain,
    UserPoolResourceServer
} from 'aws-cdk-lib/aws-cognito';
import {
    COGNITO_USER_POOL_ADMIN_GROUP,
    COGNITO_USER_POOL_CLIENT_ID,
    COGNITO_USER_POOL_DOMAIN_ID,
    COGNITO_USER_POOL_DOMAIN_PREFIX,
    COGNITO_USER_POOL_ID,
    COGNITO_USER_POOL_RESOURCE_SERVER
} from './config/cognito.config';

export function createSecurityStack(
    stack: cdk.Stack,
    props: InfrastructureStackProps,
    deps: {
        cfnDomainName: string | null;
    }
): UserPool {
    const callbackUrls = getCallBackUrls(deps.cfnDomainName);

    const userPool = createUserPool(stack, props);
    const userPoolClient = createUserPoolClient(userPool, props, callbackUrls);
    const userPoolDomain = createUserPoolDomain(userPool, props);

    createResourceServer(userPool, props);
    createSecurityOutputs(stack, userPool, userPoolClient, userPoolDomain);
    createAdminGroup(stack, props, { userPool });

    return userPool;
}

function createUserPool(
    stack: cdk.Stack,
    props: InfrastructureStackProps
): UserPool {
    return new UserPool(stack, COGNITO_USER_POOL_ID(props), {
        userPoolName: COGNITO_USER_POOL_ID(props),
        signInCaseSensitive: true,
        signInAliases: {
            email: true
        },
        selfSignUpEnabled: false,
        passwordPolicy: {
            minLength: 6,
            requireDigits: true,
            requireLowercase: false,
            requireUppercase: false
        },
        standardAttributes: {
            fullname: {
                mutable: true,
                required: true
            }
        },
        removalPolicy: RemovalPolicy.DESTROY,
        autoVerify: {
            email: true
        }
    });
}

function createUserPoolClient(
    userPool: UserPool,
    props: InfrastructureStackProps,
    callbackUrls: string[]
): UserPoolClient {
    return userPool.addClient(COGNITO_USER_POOL_CLIENT_ID(props), {
        readAttributes: new ClientAttributes().withStandardAttributes({
            email: true,
            emailVerified: false,
            fullname: true
        }),
        writeAttributes: new ClientAttributes().withStandardAttributes({
            email: true,
            emailVerified: false,
            fullname: true
        }),
        oAuth: {
            callbackUrls: [...callbackUrls],
            flows: {
                implicitCodeGrant: true
            }
        },
        userPoolClientName: COGNITO_USER_POOL_CLIENT_ID(props),
        authFlows: {
            userSrp: true
        },
        enableTokenRevocation: true,
        idTokenValidity: Duration.hours(2),
        accessTokenValidity: Duration.hours(2),
        refreshTokenValidity: Duration.hours(12)
    });
}

function createUserPoolDomain(
    userPool: UserPool,
    props: InfrastructureStackProps
): UserPoolDomain {
    return userPool.addDomain(COGNITO_USER_POOL_DOMAIN_ID(props), {
        cognitoDomain: {
            domainPrefix: COGNITO_USER_POOL_DOMAIN_PREFIX(props)
        }
    });
}

function createResourceServer(
    userPool: UserPool,
    props: InfrastructureStackProps
): UserPoolResourceServer {
    return userPool.addResourceServer(
        COGNITO_USER_POOL_RESOURCE_SERVER(props),
        {
            identifier: COGNITO_USER_POOL_RESOURCE_SERVER(props),
            userPoolResourceServerName: COGNITO_USER_POOL_RESOURCE_SERVER(props)
        }
    );
}

function createAdminGroup(
    stack: cdk.Stack,
    props: InfrastructureStackProps,
    deps: { userPool: UserPool }
): void {
    new CfnUserPoolGroup(stack, COGNITO_USER_POOL_ADMIN_GROUP(props), {
        groupName: 'admin',
        userPoolId: deps.userPool.userPoolId,
        description: 'Admin group with elevated permissions',
        precedence: 1
    });
}

function createSecurityOutputs(
    stack: cdk.Stack,
    userPool: UserPool,
    userPoolClient: UserPoolClient,
    userPoolDomain: UserPoolDomain
): void {
    new cdk.CfnOutput(stack, 'Cognito User Pool Client ID', {
        value: userPoolClient.userPoolClientId
    });

    new cdk.CfnOutput(stack, 'Cognito User Pool ID', {
        value: userPool.userPoolId
    });

    new cdk.CfnOutput(stack, 'Cognito Domain', {
        value:
            userPoolDomain.domainName +
            `.auth.${stack.region}.amazoncognito.com`
    });
}

function getCallBackUrls(domainName: string | null): string[] {
    return domainName ? ['https://' + domainName] : ['http://localhost:4200'];
}
