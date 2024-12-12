import { APIGatewayAuthorizerResult } from 'aws-lambda/trigger/api-gateway-authorizer';
import { VerifiedTokenContext } from '@sanctumlab/be/auth';

export class AuthorizerIamService {
    private async generatePolicyResult(
        principalId: string,
        effect: 'Allow' | 'Deny',
        resource: string,
        additionalContext: VerifiedTokenContext | Record<string, string> = {}
    ): Promise<APIGatewayAuthorizerResult> {
        return {
            principalId,
            context: {
                ...additionalContext,
                userId: principalId
            },
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: effect,
                        Resource: resource
                    }
                ]
            }
        };
    }

    public async generateAllow(
        principalId: string,
        resource: string,
        additionalContext: VerifiedTokenContext
    ): Promise<APIGatewayAuthorizerResult> {
        return this.generatePolicyResult(
            principalId,
            'Allow',
            resource,
            additionalContext
        );
    }

    public async generateDeny(
        principalId: string,
        resource: string
    ): Promise<APIGatewayAuthorizerResult> {
        return this.generatePolicyResult(principalId, 'Deny', resource);
    }
}

export const AuthorizerIamServiceInstance = new AuthorizerIamService();
