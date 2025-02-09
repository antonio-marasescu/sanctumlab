import {
    AppLogger,
    baseLambdaHandler,
    buildPathNotFoundResponse,
    LambdaRequestPayload
} from '@sanctumlab/be/shared';
import { handleProductsRoute, ProductsRoute } from './routes/products-router';
import { handleRecipesRoute, RecipesRoute } from './routes/recipes-router';
import {
    handleIngredientsRoute,
    IngredientsRoute
} from './routes/ingredients-router';

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
        if (event.resource.includes(RecipesRoute)) {
            AppLogger.info('[Handler] Recipes Routing');

            if (event.resource.includes(IngredientsRoute)) {
                AppLogger.info('[Handler] Ingredients Routing');
                return handleIngredientsRoute(event);
            }

            return handleRecipesRoute(event);
        }

        return buildPathNotFoundResponse();
    });
