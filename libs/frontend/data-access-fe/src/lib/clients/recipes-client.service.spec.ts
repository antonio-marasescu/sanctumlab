import {
    HttpTestingController,
    provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideApiEndpointConfiguration } from '../config/api-settings.config';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
    createMockCreateRecipeDto,
    createMockIngredientDto,
    createMockRecipeDto,
    createMockUpdateIngredientDto,
    createMockUpdateRecipeDto
} from '@sanctumlab/api-interfaces';
import { RecipesClientService } from './recipes-client.service';

describe('RecipesClientService', () => {
    let service: RecipesClientService;
    let httpTestingController: HttpTestingController;
    const mockAddress = 'http://localhost:3000';
    const mockAddressEndpoint = `${mockAddress}/recipes`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideApiEndpointConfiguration({
                    address: mockAddress
                }),
                RecipesClientService
            ]
        });
        service = TestBed.inject(RecipesClientService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Recipes Endpoint', () => {
        it('should call POST /recipes to create a recipe', done => {
            const mockPayload = createMockCreateRecipeDto();
            const mockResponse = createMockRecipeDto({
                id: '1'
            });

            service.createRecipe(mockPayload).subscribe({
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

        it('should call PUT /recipes/:id to update a recipe', done => {
            const mockRecipeId = '1';
            const mockUpdatePayload = createMockUpdateRecipeDto();
            const mockResponse = createMockRecipeDto({
                id: mockRecipeId
            });

            service.updateRecipe(mockRecipeId, mockUpdatePayload).subscribe({
                next: response => {
                    expect(response).toEqual(mockResponse);
                    done();
                },
                error: (error: HttpErrorResponse) => {
                    done.fail(error);
                }
            });

            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}/${mockRecipeId}`
            );
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(mockUpdatePayload);
            req.flush(mockResponse);
        });

        it('should call DELETE /recipes/:id to remove a recipe', done => {
            const mockRecipeId = '1';

            service.removeRecipeById(mockRecipeId).subscribe({
                next: response => {
                    expect(response).toBeNull();
                    done();
                },
                error: (error: HttpErrorResponse) => {
                    done.fail(error);
                }
            });

            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}/${mockRecipeId}`
            );
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });

        it('should call GET /recipes/:id to retrieve a recipe', done => {
            const mockRecipeId = '1';
            const mockResponse = createMockRecipeDto({
                id: mockRecipeId
            });
            service.retrieveRecipeById(mockRecipeId).subscribe({
                next: response => {
                    expect(response).toEqual(mockResponse);
                    done();
                },
                error: (error: HttpErrorResponse) => {
                    done.fail(error);
                }
            });
            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}/${mockRecipeId}`
            );
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should call GET /recipes to retrieve a list of recipes', done => {
            const mockResponse = [createMockRecipeDto()];
            service.retrieveRecipes().subscribe({
                next: response => {
                    expect(response).toEqual(mockResponse);
                    done();
                },
                error: (error: HttpErrorResponse) => {
                    done.fail(error);
                }
            });
            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}`
            );
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('Ingredients Endpoint', () => {
        it('should call POST /recipes/ingredients to create an ingredient', done => {
            const mockPayload = createMockIngredientDto();
            const mockResponse = createMockIngredientDto({
                id: '1'
            });

            service.createIngredient(mockPayload).subscribe({
                next: response => {
                    expect(response).toEqual(mockResponse);
                    done();
                },
                error: (error: HttpErrorResponse) => {
                    done.fail(error);
                }
            });

            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}/ingredients`
            );
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(mockPayload);
            req.flush(mockResponse);
        });

        it('should call PUT /recipes/ingredients/:id to update an ingredient', done => {
            const mockIngredientId = '1';
            const mockUpdatePayload = createMockUpdateIngredientDto();
            const mockResponse = createMockIngredientDto({
                id: mockIngredientId
            });

            service
                .updateIngredient(mockIngredientId, mockUpdatePayload)
                .subscribe({
                    next: response => {
                        expect(response).toEqual(mockResponse);
                        done();
                    },
                    error: (error: HttpErrorResponse) => {
                        done.fail(error);
                    }
                });

            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}/ingredients/${mockIngredientId}`
            );
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(mockUpdatePayload);
            req.flush(mockResponse);
        });

        it('should call DELETE /recipes/ingredients/:id to remove an ingredient', done => {
            const mockIngredientId = '1';

            service.removeIngredientById(mockIngredientId).subscribe({
                next: response => {
                    expect(response).toBeNull();
                    done();
                },
                error: (error: HttpErrorResponse) => {
                    done.fail(error);
                }
            });

            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}/ingredients/${mockIngredientId}`
            );
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });

        it('should call GET /recipes/ingredients/:id to retrieve an ingredient', done => {
            const mockIngredientId = '1';
            const mockResponse = createMockIngredientDto({
                id: mockIngredientId
            });
            service.retrieveIngredientById(mockIngredientId).subscribe({
                next: response => {
                    expect(response).toEqual(mockResponse);
                    done();
                },
                error: (error: HttpErrorResponse) => {
                    done.fail(error);
                }
            });
            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}/ingredients/${mockIngredientId}`
            );
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should call GET /recipes/ingredients to retrieve a list of ingredients', done => {
            const mockResponse = [createMockIngredientDto()];
            service.retrieveIngredients().subscribe({
                next: response => {
                    expect(response).toEqual(mockResponse);
                    done();
                },
                error: (error: HttpErrorResponse) => {
                    done.fail(error);
                }
            });
            const req = httpTestingController.expectOne(
                `${mockAddressEndpoint}/ingredients`
            );
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });
});
