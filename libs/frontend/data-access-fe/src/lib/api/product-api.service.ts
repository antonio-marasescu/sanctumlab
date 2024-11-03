import { inject, Injectable } from '@angular/core';
import {
    CreateProductItemDto,
    ProductItemCategory,
    ProductItemDto,
    UpdateProductItemDto
} from '@sanctumlab/api-interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    selectCurrentProduct,
    selectProductById,
    selectProductsByCategory
} from '../state/products/products.selectors';
import { ProductsActions } from '../state/products/products.actions';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
    private readonly store = inject(Store);

    public retrieveProductsByCategoryStream(
        category: ProductItemCategory
    ): Observable<ProductItemDto[]> {
        return this.store.select(selectProductsByCategory(category));
    }

    public retrieveProductByIdStream(id: string): Observable<ProductItemDto> {
        return this.store.select(selectProductById(id));
    }

    public retrieveCurrentProductStream(): Observable<ProductItemDto | null> {
        return this.store.select(selectCurrentProduct());
    }

    public sendRetrieveProductList(): void {
        this.store.dispatch(ProductsActions.getProductList());
    }

    public sendRetrieveProductById(id: string): void {
        this.store.dispatch(ProductsActions.getProductById({ id }));
    }

    public sendCreateProduct(payload: CreateProductItemDto): void {
        this.store.dispatch(
            ProductsActions.createProduct({ product: payload })
        );
    }

    public sendUpdateProduct(id: string, payload: UpdateProductItemDto): void {
        this.store.dispatch(
            ProductsActions.updateProduct({ id, product: payload })
        );
    }

    public sendRemoveProduct(id: string): void {
        this.store.dispatch(ProductsActions.removeProduct({ id }));
    }

    public sendSetCurrentProduct(id: string): void {
        this.store.dispatch(ProductsActions.setCurrentProduct({ id }));
    }

    public sendUnsetCurrentProduct(): void {
        this.store.dispatch(ProductsActions.unsetCurrentProduct());
    }
}
