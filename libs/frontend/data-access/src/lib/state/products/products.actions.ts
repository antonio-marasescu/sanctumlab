import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    CreateProductItemDto,
    ProductItemDto,
    UpdateProductItemDto
} from '@sanctumlab/api-interfaces';

export const ProductsActions = createActionGroup({
    source: 'Products',
    events: {
        CreateProduct: props<{ product: CreateProductItemDto }>(),
        CreateProductSuccess: props<{ product: ProductItemDto }>(),
        UpdateProduct: props<{ product: UpdateProductItemDto; id: string }>(),
        UpdateProductSuccess: props<{ product: ProductItemDto }>(),
        RemoveProduct: props<{ id: string }>(),
        RemoveProductSuccess: props<{ id: string }>(),
        GetProductList: emptyProps(),
        GetProductListSuccess: props<{ products: ProductItemDto[] }>(),
        ProductFailure: props<{ reason: string }>()
    }
});
