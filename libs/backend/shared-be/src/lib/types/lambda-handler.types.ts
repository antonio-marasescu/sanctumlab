import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export type LambdaHandler = (
    event: APIGatewayProxyEvent
) => Promise<APIGatewayProxyResult>;
