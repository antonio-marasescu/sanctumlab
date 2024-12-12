import { APIGatewayAuthorizerResult } from 'aws-lambda/trigger/api-gateway-authorizer';

export class AuthorizerIamService {
    private async generatePolicyResult(
        principalId: string,
        effect: 'Allow' | 'Deny',
        resource: string,
        additionalContext: Record<string, string | string[]>
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
        roles: string[],
        email: string
    ): Promise<APIGatewayAuthorizerResult> {
        return this.generatePolicyResult(principalId, 'Allow', resource, {
            roles,
            email
        });
    }

    public async generateDeny(
        principalId: string,
        resource: string
    ): Promise<APIGatewayAuthorizerResult> {
        return this.generatePolicyResult(principalId, 'Deny', resource, {});
    }
}

export const AuthorizerIamServiceInstance = new AuthorizerIamService();
