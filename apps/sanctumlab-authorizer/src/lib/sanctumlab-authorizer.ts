import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent
} from 'aws-lambda';
import { AuthorizerIamServiceInstance } from './services/authorizer-iam.service';
import {
    AuthVerifierApiInstance,
    VerifiedTokenContext
} from '@sanctumlab/be/auth';
import { AppLogger } from '@sanctumlab/be/shared';
import { JsonObject } from 'aws-jwt-verify/safe-json-parse';

const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = process.env;

export async function main(
    event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> {
    try {
        const authorizationToken = event?.authorizationToken?.split(' ')[1];
        if (!authorizationToken) {
            AppLogger.error('Token not found');
            return AuthorizerIamServiceInstance.generateDeny(
                'default',
                event.methodArn
            );
        }

        const verifiedToken = await AuthVerifierApiInstance.authorize(
            authorizationToken,
            {
                userPoolId: COGNITO_USER_POOL_ID as string,
                userPoolClientId: COGNITO_CLIENT_ID as string
            }
        );

        AppLogger.debug('Token is valid. Token: ', { verifiedToken });
        if (verifiedToken) {
            const additionalContext: VerifiedTokenContext = {
                tokenType: verifiedToken.token_use,
                sub: verifiedToken.sub,
                name: (verifiedToken as JsonObject)['name'] as string,
                roles: verifiedToken['cognito:groups']?.toString(),
                email: (verifiedToken as JsonObject)['email'] as string
            };
            const policy = await AuthorizerIamServiceInstance.generateAllow(
                verifiedToken['cognito:username'],
                event.methodArn,
                additionalContext
            );
            AppLogger.debug('Access Policy', { policy });
            return policy;
        }
    } catch (err: unknown) {
        AppLogger.error('Error during token validation:', { err });
    }

    return AuthorizerIamServiceInstance.generateDeny(
        'default',
        event.methodArn
    );
}
