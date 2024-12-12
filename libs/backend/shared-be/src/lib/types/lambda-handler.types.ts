import {
    APIGatewayProxyResult,
    APIGatewayProxyWithLambdaAuthorizerEvent
} from 'aws-lambda';
import { VerifiedTokenContext } from '@sanctumlab/be/auth';

export type AuthorizerContext = VerifiedTokenContext;
export type LambdaRequestPayload =
    APIGatewayProxyWithLambdaAuthorizerEvent<AuthorizerContext>;
export type LambdaResponsePayload = APIGatewayProxyResult;

export type LambdaHandler = (
    event: LambdaRequestPayload
) => Promise<LambdaResponsePayload>;
