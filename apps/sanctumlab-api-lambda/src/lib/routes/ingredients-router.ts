import {
    buildOkResponse,
    buildPathNotFoundResponse,
    LambdaRequestPayload,
    LambdaResponsePayload
} from '@sanctumlab/be/shared';
import { IngredientsApiInstance } from '@sanctumlab/be/recipe-api-feature';

export const IngredientsRoute = '/ingredients';

export async function handleIngredientsRoute(
    event: LambdaRequestPayload
): Promise<LambdaResponsePayload> {
    const httpMethod = event.httpMethod;
    const id = event.pathParameters?.['id'];
    const body = JSON.parse(event.body ?? '{}');

    switch (httpMethod) {
        case 'GET': {
            if (id) {
                console.info('Event Ingredient Get By Id');
                const ingredient = await IngredientsApiInstance.retrieveById(
                    id,
                    event.requestContext?.authorizer
                );
                return buildOkResponse(ingredient);
            } else {
                console.info('Event Ingredient Get All');
                const ingredients = await IngredientsApiInstance.retrieveAll(
                    event.requestContext?.authorizer
                );
                return buildOkResponse(ingredients);
            }
        }
        case 'PUT': {
            console.info('Event Ingredient Update');
            if (id) {
                const ingredient = await IngredientsApiInstance.update(
                    id,
                    body,
                    event.requestContext?.authorizer
                );
                return buildOkResponse(ingredient);
            }
            break;
        }
        case 'DELETE': {
            console.info('Event Ingredient Delete');
            if (id) {
                const ok = await IngredientsApiInstance.removeById(
                    id,
                    event.requestContext?.authorizer
                );
                return buildOkResponse({ ok });
            }
            break;
        }
        case 'POST': {
            console.info('Event Ingredient Create');
            const ingredient = await IngredientsApiInstance.create(
                body,
                event.requestContext?.authorizer
            );
            return buildOkResponse(ingredient);
        }
    }

    return buildPathNotFoundResponse();
}
