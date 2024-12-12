import { mock } from 'jest-mock-extended';
import { ProductsService } from '../services/products.service';
import {
    createMockCreateProductItemDto,
    createMockProductItemDto,
    createMockUpdateProductItemDto,
    ProductItemCategory
} from '@sanctumlab/api-interfaces';
import {
    InvalidPayloadException,
    mockAppLogger,
    NotAuthorizedException,
    NotFoundException
} from '@sanctumlab/be/shared';
import { ProductsApi } from './products.api';
import {
    createMockProductModel,
    ProductItemCategoryDomain,
    ProductModel
} from '@sanctumlab/be/data-access';
import { ZodError } from 'zod';
import { createMockVerifiedContext } from '@sanctumlab/be/auth';

describe('ProductsApi', () => {
    let productsServiceMock = mock<ProductsService>();
    let productsApi: ProductsApi;

    beforeEach(() => {
        mockAppLogger(jest);
        productsServiceMock = mock<ProductsService>();
        productsApi = new ProductsApi(productsServiceMock);
    });

    describe('retrieveAll', () => {
        it('should retrieve all products', async () => {
            const mockProductsModel = [
                createMockProductModel({ id: '1', name: 'Product A' }),
                createMockProductModel({ id: '2', name: 'Product B' })
            ];
            productsServiceMock.retrieveAll.mockResolvedValue(
                mockProductsModel
            );
            const expectedProductsDto = [
                createMockProductItemDto({ id: '1', name: 'Product A' }),
                createMockProductItemDto({ id: '2', name: 'Product B' })
            ];

            const result = await productsApi.retrieveAll();

            expect(result).toEqual(expectedProductsDto);
            expect(productsServiceMock.retrieveAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('retrieveById', () => {
        it('should retrieve a product by id', async () => {
            const mockProductDto = createMockProductItemDto({
                id: '1',
                name: 'Product A'
            });
            const mockProductModel = createMockProductModel({
                id: '1',
                name: 'Product A'
            });
            productsServiceMock.retrieveById.mockResolvedValue(
                mockProductModel
            );

            const result = await productsApi.retrieveById('1');

            expect(result).toEqual(mockProductDto);
            expect(productsServiceMock.retrieveById).toHaveBeenCalledWith('1');
        });

        it('should throw NotFoundException if product is not found', async () => {
            productsServiceMock.retrieveById.mockRejectedValue(
                new NotFoundException()
            );

            await expect(
                productsApi.retrieveById('unknown-id')
            ).rejects.toThrow(NotFoundException);
            expect(productsServiceMock.retrieveById).toHaveBeenCalledWith(
                'unknown-id'
            );
        });
    });

    describe('removeById', () => {
        it('should remove a product by id', async () => {
            productsServiceMock.removeById.mockResolvedValue(true);

            const result = await productsApi.removeById(
                '1',
                createMockVerifiedContext()
            );

            expect(result).toBe(true);
            expect(productsServiceMock.removeById).toHaveBeenCalledWith('1');
        });

        it('should throw InvalidPayloadException on remove failure', async () => {
            productsServiceMock.removeById.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                productsApi.removeById('1', createMockVerifiedContext())
            ).rejects.toThrow(new InvalidPayloadException());
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            await expect(
                productsApi.removeById(
                    '1',
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(new NotAuthorizedException());
        });
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const mockCreateDto = createMockCreateProductItemDto({
                name: 'Nachos',
                description:
                    'Crispy tortilla chips topped with melted cheese and jalapenos',
                category: ProductItemCategory.Snacks,
                recipe: 'Spread tortilla chips on a baking sheet, sprinkle cheese, add jalapenos, and bake until cheese melts.',
                tags: ['snack', 'vegetarian', 'cheese'],
                available: true
            });
            const mockProductModel = createMockProductModel({
                id: '1',
                name: 'Nachos',
                description:
                    'Crispy tortilla chips topped with melted cheese and jalapenos',
                category: ProductItemCategoryDomain.Snacks,
                recipe: 'Spread tortilla chips on a baking sheet, sprinkle cheese, add jalapenos, and bake until cheese melts.',
                tags: ['snack', 'vegetarian', 'cheese'],
                available: true
            }) as Required<ProductModel>;
            const mockExpectedProduct = createMockProductItemDto({
                id: '1',
                name: 'Nachos',
                description:
                    'Crispy tortilla chips topped with melted cheese and jalapenos',
                category: ProductItemCategory.Snacks,
                recipe: 'Spread tortilla chips on a baking sheet, sprinkle cheese, add jalapenos, and bake until cheese melts.',
                tags: ['snack', 'vegetarian', 'cheese'],
                available: true
            });

            productsServiceMock.create.mockResolvedValue(mockProductModel);

            const result = await productsApi.create(
                mockCreateDto,
                createMockVerifiedContext()
            );

            expect(result).toEqual(mockExpectedProduct);
            expect(productsServiceMock.create).toHaveBeenCalledWith(
                expect.anything()
            );
        });

        it('should throw ZodError on invalid dto payload', async () => {
            const mockCreateDto = createMockCreateProductItemDto({
                name: undefined,
                description: ''
            });

            await expect(
                productsApi.create(mockCreateDto, createMockVerifiedContext())
            ).rejects.toThrow(ZodError);
        });

        it('should throw InvalidPayloadException on create failure', async () => {
            const mockCreateDto = createMockCreateProductItemDto();
            productsServiceMock.create.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                productsApi.create(mockCreateDto, createMockVerifiedContext())
            ).rejects.toThrow(InvalidPayloadException);
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            const mockCreateDto = createMockCreateProductItemDto();

            await expect(
                productsApi.create(
                    mockCreateDto,
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(NotAuthorizedException);
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            const mockUpdateDto = createMockUpdateProductItemDto({
                name: 'Nachos Updated',
                description:
                    'Crispy tortilla chips topped with melted cheese and jalapenos',
                category: ProductItemCategory.Snacks,
                recipe: 'Spread tortilla chips on a baking sheet, sprinkle cheese, add jalapenos, and bake until cheese melts.',
                tags: ['snack', 'vegetarian', 'cheese'],
                available: true
            });
            const mockOldProductModel = createMockProductModel({
                id: '1',
                name: 'Nachos',
                description:
                    'Crispy tortilla chips topped with melted cheese and jalapenos',
                category: ProductItemCategoryDomain.Snacks,
                recipe: 'Spread tortilla chips on a baking sheet, sprinkle cheese, add jalapenos, and bake until cheese melts.',
                tags: ['snack', 'vegetarian', 'cheese'],
                available: true
            }) as Required<ProductModel>;
            const mockProductModel = createMockProductModel({
                id: '1',
                name: 'Nachos Updated',
                description:
                    'Crispy tortilla chips topped with melted cheese and jalapenos',
                category: ProductItemCategoryDomain.Snacks,
                recipe: 'Spread tortilla chips on a baking sheet, sprinkle cheese, add jalapenos, and bake until cheese melts.',
                tags: ['snack', 'vegetarian', 'cheese'],
                available: true
            }) as Required<ProductModel>;
            const mockExpectedProduct = createMockProductItemDto({
                id: '1',
                name: 'Nachos Updated',
                description:
                    'Crispy tortilla chips topped with melted cheese and jalapenos',
                category: ProductItemCategory.Snacks,
                recipe: 'Spread tortilla chips on a baking sheet, sprinkle cheese, add jalapenos, and bake until cheese melts.',
                tags: ['snack', 'vegetarian', 'cheese'],
                available: true
            });

            productsServiceMock.retrieveById.mockResolvedValue(
                mockOldProductModel
            );
            productsServiceMock.update.mockResolvedValue(mockProductModel);

            const result = await productsApi.update(
                '1',
                mockUpdateDto,
                createMockVerifiedContext()
            );

            expect(result).toEqual(mockExpectedProduct);
            expect(productsServiceMock.update).toHaveBeenCalledWith(
                '1',
                expect.anything()
            );
        });

        it('should throw InvalidPayloadException on update failure', async () => {
            const mockUpdateDto = createMockUpdateProductItemDto();
            const mockOldProductModel = createMockProductModel({
                id: '1'
            }) as Required<ProductModel>;
            productsServiceMock.retrieveById.mockResolvedValue(
                mockOldProductModel
            );
            productsServiceMock.update.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                productsApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(InvalidPayloadException);
        });

        it('should throw NotFoundException on retrieve old model failure', async () => {
            const mockUpdateDto = createMockUpdateProductItemDto();
            productsServiceMock.retrieveById.mockRejectedValue(
                new NotFoundException()
            );

            await expect(
                productsApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(NotFoundException);
        });

        it('should throw ZodError on invalid dto payload', async () => {
            const mockUpdateDto = createMockUpdateProductItemDto({
                name: undefined,
                description: ''
            });

            await expect(
                productsApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(ZodError);
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            const mockUpdateDto = createMockUpdateProductItemDto({
                name: undefined,
                description: ''
            });

            await expect(
                productsApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(NotAuthorizedException);
        });
    });
});
