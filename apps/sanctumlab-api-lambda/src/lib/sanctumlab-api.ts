import {
    baseLambdaHandler,
    buildPathNotFoundResponse,
    LambdaRequestPayload
} from '@sanctumlab/be/shared';
import { handleProductsRoute, ProductsRoute } from './routes/products-router';

export const main = async (mainEvent: LambdaRequestPayload) =>
    baseLambdaHandler(mainEvent, async event => {
        if (event.resource.includes(ProductsRoute)) {
            return handleProductsRoute(event);
        }

        return buildPathNotFoundResponse();
    });
