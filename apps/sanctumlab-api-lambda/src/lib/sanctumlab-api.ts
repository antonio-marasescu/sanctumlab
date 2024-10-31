import { APIGatewayProxyEvent } from 'aws-lambda';
import {
    baseLambdaHandler,
    InvalidPayloadException
} from '@sanctumlab/be/shared';

export const main = async (mainEvent: APIGatewayProxyEvent) =>
    baseLambdaHandler(mainEvent, async event => {
        const id = event.pathParameters?.['id'];
        if (!id) {
            throw new InvalidPayloadException();
        }

        const response = { ok: true };
        return {
            body: JSON.stringify(response),
            statusCode: 200
        };
    });
