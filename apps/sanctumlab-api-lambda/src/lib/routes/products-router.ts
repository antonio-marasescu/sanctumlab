import {
    buildOkResponse,
    LambdaRequestPayload,
    LambdaResponsePayload
} from '@sanctumlab/be/shared';
import { ProductsApiInstance } from '@sanctumlab/be/products-feature';

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
                const product = await ProductsApiInstance.retrieveById(id);
                return buildOkResponse(product);
            } else {
                const products = await ProductsApiInstance.retrieveAll();
                return buildOkResponse(products);
            }
        }
        case 'PUT': {
            if (id) {
                const product = await ProductsApiInstance.update(id, body);
                return buildOkResponse(product);
            }
            break;
        }
        case 'DELETE': {
            if (id) {
                const ok = await ProductsApiInstance.removeById(id);
                return buildOkResponse({ ok });
            }
            break;
        }
        case 'POST': {
            const product = await ProductsApiInstance.create(body);
            return buildOkResponse({ product });
        }
    }

    return {
        body: 'Resource not found',
        statusCode: 404
    };
}
