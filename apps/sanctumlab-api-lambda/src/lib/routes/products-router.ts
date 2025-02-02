import {
    buildOkResponse,
    buildPathNotFoundResponse,
    LambdaRequestPayload,
    LambdaResponsePayload
} from '@sanctumlab/be/shared';
import { ProductsApiInstance } from '@sanctumlab/be/products-api-feature';

export const ProductsRoute = '/products';

export async function handleProductsRoute(
    event: LambdaRequestPayload
): Promise<LambdaResponsePayload> {
    const httpMethod = event.httpMethod;
    const id = event.pathParameters?.['id'];
    const body = JSON.parse(event.body ?? '{}');

    switch (httpMethod) {
        case 'GET': {
            if (id) {
                console.info('Event Product Get By Id');
                const product = await ProductsApiInstance.retrieveById(id);
                return buildOkResponse(product);
            } else {
                console.info('Event Product Get All');
                const products = await ProductsApiInstance.retrieveAll();
                return buildOkResponse(products);
            }
        }
        case 'PUT': {
            console.info('Event Product Update');
            if (id) {
                const product = await ProductsApiInstance.update(
                    id,
                    body,
                    event.requestContext?.authorizer
                );
                return buildOkResponse(product);
            }
            break;
        }
        case 'DELETE': {
            console.info('Event Product Delete');
            if (id) {
                const ok = await ProductsApiInstance.removeById(
                    id,
                    event.requestContext?.authorizer
                );
                return buildOkResponse({ ok });
            }
            break;
        }
        case 'POST': {
            console.info('Event Product Create');
            const product = await ProductsApiInstance.create(
                body,
                event.requestContext?.authorizer
            );
            return buildOkResponse(product);
        }
    }

    return buildPathNotFoundResponse();
}
