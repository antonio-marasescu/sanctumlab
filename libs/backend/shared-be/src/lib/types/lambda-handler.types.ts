import {
    APIGatewayEventRequestContextJWTAuthorizer,
    APIGatewayProxyResult,
    APIGatewayProxyWithLambdaAuthorizerEvent
} from 'aws-lambda';

export type AuthorizerContext = APIGatewayEventRequestContextJWTAuthorizer;
export type LambdaRequestPayload =
    APIGatewayProxyWithLambdaAuthorizerEvent<AuthorizerContext>;
export type LambdaResponsePayload = APIGatewayProxyResult;

export type LambdaHandler = (
    event: LambdaRequestPayload
) => Promise<LambdaResponsePayload>;
