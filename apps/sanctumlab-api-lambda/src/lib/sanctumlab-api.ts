import {
    AppLogger,
    baseLambdaHandler,
    buildPathNotFoundResponse,
    LambdaRequestPayload
} from '@sanctumlab/be/shared';
import { handleProductsRoute, ProductsRoute } from './routes/products-router';

export const main = async (mainEvent: LambdaRequestPayload) =>
    baseLambdaHandler(mainEvent, async event => {
        AppLogger.info('[Handler] Event Received', {
            resource: mainEvent.resource,
            path: mainEvent.path,
            pathParams: mainEvent.pathParameters,
            queryStringParameters: mainEvent.queryStringParameters,
            httpMethod: mainEvent.httpMethod
        });
        if (event.resource.includes(ProductsRoute)) {
            AppLogger.info('[Handler] Products Routing');
            return handleProductsRoute(event);
        }

        return buildPathNotFoundResponse();
    });
