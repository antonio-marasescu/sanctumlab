import { Inject, Injectable } from '@angular/core';
import {
    CreateProductItemDto,
    ProductItemDto,
    UpdateProductItemDto
} from '@sanctumlab/api-interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
    API_ENDPOINT_CONFIG,
    ApiEndpointConfiguration
} from '../config/api-settings.config';

@Injectable({ providedIn: 'root' })
export class ProductsClientService {
    private readonly baseRoute: string;
    constructor(
        @Inject(API_ENDPOINT_CONFIG)
        private readonly apiEndpointConfiguration: ApiEndpointConfiguration,
        private readonly httpClient: HttpClient
    ) {
        this.baseRoute = `${this.apiEndpointConfiguration.address}/products`;
    }

    public createProduct(
        payload: CreateProductItemDto
    ): Observable<ProductItemDto> {
        return this.httpClient.post<ProductItemDto>(this.baseRoute, payload);
    }

    public updateProduct(
        id: string,
        payload: UpdateProductItemDto
    ): Observable<ProductItemDto> {
        return this.httpClient.put<ProductItemDto>(
            `${this.baseRoute}/${id}`,
            payload
        );
    }

    public removeProduct(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseRoute}/${id}`);
    }

    public retrieveProductById(id: string): Observable<ProductItemDto> {
        return this.httpClient.get<ProductItemDto>(`${this.baseRoute}/${id}`);
    }

    public retrieveProducts(): Observable<ProductItemDto[]> {
        return this.httpClient.get<ProductItemDto[]>(`${this.baseRoute}`);
    }
}
