import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent
} from 'aws-lambda';
import { AuthorizerIamServiceInstance } from './services/authorizer-iam.service';
import { AuthVerifierApiInstance } from '@sanctumlab/be/auth';
import { AppLogger } from '@sanctumlab/be/shared';

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
            const policy = await AuthorizerIamServiceInstance.generateAllow(
                verifiedToken['cognito:username'],
                event.methodArn
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
