import {
    buildOkResponse,
    buildPathNotFoundResponse,
    LambdaRequestPayload,
    LambdaResponsePayload
} from '@sanctumlab/be/shared';
import { RecipesApiInstance } from '@sanctumlab/be/recipe-api-feature';

export const RecipesRoute = '/recipes';

export async function handleRecipesRoute(
    event: LambdaRequestPayload
): Promise<LambdaResponsePayload> {
    const httpMethod = event.httpMethod;
    const id = event.pathParameters?.['id'];
    const body = JSON.parse(event.body ?? '{}');

    switch (httpMethod) {
        case 'GET': {
            if (id) {
                console.info('Event Recipe Get By Id');
                const recipe = await RecipesApiInstance.retrieveById(
                    id,
                    event.requestContext?.authorizer
                );
                return buildOkResponse(recipe);
            } else {
                console.info('Event Recipe Get All');
                const recipes = await RecipesApiInstance.retrieveAll(
                    event.requestContext?.authorizer
                );
                return buildOkResponse(recipes);
            }
        }
        case 'PUT': {
            console.info('Event Recipe Update');
            if (id) {
                const recipe = await RecipesApiInstance.update(
                    id,
                    body,
                    event.requestContext?.authorizer
                );
                return buildOkResponse(recipe);
            }
            break;
        }
        case 'DELETE': {
            console.info('Event Recipe Delete');
            if (id) {
                const ok = await RecipesApiInstance.removeById(
                    id,
                    event.requestContext?.authorizer
                );
                return buildOkResponse({ ok });
            }
            break;
        }
        case 'POST': {
            console.info('Event Recipe Create');
            const recipe = await RecipesApiInstance.create(
                body,
                event.requestContext?.authorizer
            );
            return buildOkResponse(recipe);
        }
    }

    return buildPathNotFoundResponse();
}
