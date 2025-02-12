import { ProductsClientService } from './products-client.service';
import {
    HttpTestingController,
    provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideApiEndpointConfiguration } from '../config/api-settings.config';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
    createMockCreateProductItemDto,
    createMockProductItemDto,
    createMockUpdateProductItemDto
} from '@sanctumlab/api-interfaces';

describe('ProductsClientService', () => {
    let service: ProductsClientService;
    let httpTestingController: HttpTestingController;
    const mockAddress = 'http://localhost:3000';
    const mockAddressEndpoint = `${mockAddress}/products`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideApiEndpointConfiguration({
                    address: mockAddress
                }),
                ProductsClientService
            ]
        });
        service = TestBed.inject(ProductsClientService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call POST /products to create a product', done => {
        const mockPayload = createMockCreateProductItemDto();
        const mockResponse = createMockProductItemDto({
            id: '1'
        });

        service.createProduct(mockPayload).subscribe({
            next: response => {
                expect(response).toEqual(mockResponse);
                done();
            },
            error: (error: HttpErrorResponse) => {
                done.fail(error);
            }
        });

        const req = httpTestingController.expectOne(mockAddressEndpoint);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockPayload);
        req.flush(mockResponse);
    });

    it('should call PUT /products/:id to update a product', done => {
        const mockProductId = '1';
        const mockUpdatePayload = createMockUpdateProductItemDto();
        const mockResponse = createMockProductItemDto({
            id: mockProductId
        });

        service.updateProduct(mockProductId, mockUpdatePayload).subscribe({
            next: response => {
                expect(response).toEqual(mockResponse);
                done();
            },
            error: (error: HttpErrorResponse) => {
                done.fail(error);
            }
        });

        const req = httpTestingController.expectOne(
            `${mockAddressEndpoint}/${mockProductId}`
        );
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(mockUpdatePayload);
        req.flush(mockResponse);
    });

    it('should call DELETE /products/:id to remove a product', done => {
        const mockProductId = '1';

        service.removeProduct(mockProductId).subscribe({
            next: response => {
                expect(response).toBeNull();
                done();
            },
            error: (error: HttpErrorResponse) => {
                done.fail(error);
            }
        });

        const req = httpTestingController.expectOne(
            `${mockAddressEndpoint}/${mockProductId}`
        );
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });

    it('should call GET /products/:id to retrieve a product', done => {
        const mockProductId = '1';
        const mockResponse = createMockProductItemDto({
            id: mockProductId
        });
        service.retrieveProductById(mockProductId).subscribe({
            next: response => {
                expect(response).toEqual(mockResponse);
                done();
            },
            error: (error: HttpErrorResponse) => {
                done.fail(error);
            }
        });
        const req = httpTestingController.expectOne(
            `${mockAddressEndpoint}/${mockProductId}`
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should call GET /products to retrieve a list of products', done => {
        const mockResponse = [createMockProductItemDto()];
        service.retrieveProducts().subscribe({
            next: response => {
                expect(response).toEqual(mockResponse);
                done();
            },
            error: (error: HttpErrorResponse) => {
                done.fail(error);
            }
        });
        const req = httpTestingController.expectOne(`${mockAddressEndpoint}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});
