import { mock } from 'jest-mock-extended';
import {
    createMockProductModel,
    ProductModel,
    ProductsRepository
} from '@sanctumlab/be/data-access';
import {
    InvalidPayloadException,
    NotFoundException
} from '@sanctumlab/be/shared';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
    let productsRepositoryMock = mock<ProductsRepository>();
    let productsService: ProductsService;

    beforeEach(() => {
        productsRepositoryMock = mock<ProductsRepository>();
        productsService = new ProductsService(productsRepositoryMock);
    });

    describe('retrieveAll', () => {
        it('should retrieve all products', async () => {
            const mockProducts = [
                createMockProductModel({ id: '1', name: 'Product A' }),
                createMockProductModel({ id: '2', name: 'Product B' })
            ];
            productsRepositoryMock.retrieveAll.mockResolvedValue(mockProducts);

            const result = await productsService.retrieveAll();

            expect(result).toEqual(mockProducts);
            expect(productsRepositoryMock.retrieveAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('retrieveById', () => {
        it('should retrieve a product by id', async () => {
            const mockProduct = createMockProductModel({ id: '1' });
            productsRepositoryMock.retrieveById.mockResolvedValue(mockProduct);

            const result = await productsService.retrieveById('1');

            expect(result).toEqual(mockProduct);
            expect(productsRepositoryMock.retrieveById).toHaveBeenCalledWith(
                '1'
            );
        });

        it('should throw NotFoundException if product is not found', async () => {
            productsRepositoryMock.retrieveById.mockResolvedValue(undefined);

            await expect(
                productsService.retrieveById('unknown-id')
            ).rejects.toThrow(NotFoundException);
            expect(productsRepositoryMock.retrieveById).toHaveBeenCalledWith(
                'unknown-id'
            );
        });
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const mockProduct = createMockProductModel({
                id: '1'
            }) as Required<ProductModel>;
            productsRepositoryMock.create.mockResolvedValue(mockProduct);

            const result = await productsService.create(mockProduct);

            expect(result).toEqual(mockProduct);
            expect(productsRepositoryMock.create).toHaveBeenCalledWith(
                mockProduct
            );
        });

        it('should throw InvalidPayloadException on create failure', async () => {
            productsRepositoryMock.create.mockRejectedValue(new Error());
            const mockProduct = createMockProductModel({
                id: '1'
            }) as Required<ProductModel>;
            await expect(productsService.create(mockProduct)).rejects.toThrow(
                InvalidPayloadException
            );
        });
    });

    describe('update', () => {
        it('should update an existing product', async () => {
            const mockProduct = createMockProductModel({
                id: '1'
            }) as Required<ProductModel>;
            productsRepositoryMock.update.mockResolvedValue(mockProduct);

            const result = await productsService.update('1', mockProduct);

            expect(result).toEqual(mockProduct);
            expect(productsRepositoryMock.update).toHaveBeenCalledWith(
                '1',
                mockProduct
            );
        });

        it('should throw InvalidPayloadException on update failure', async () => {
            productsRepositoryMock.update.mockRejectedValue(new Error());

            await expect(
                productsService.update('1', createMockProductModel({ id: '1' }))
            ).rejects.toThrow(InvalidPayloadException);
        });
    });

    describe('removeById', () => {
        it('should remove a product by id', async () => {
            productsRepositoryMock.removeById.mockResolvedValue(true);

            const result = await productsService.removeById('1');

            expect(result).toBe(true);
            expect(productsRepositoryMock.removeById).toHaveBeenCalledWith('1');
        });

        it('should throw InvalidPayloadException on remove failure', async () => {
            productsRepositoryMock.removeById.mockRejectedValue(new Error());

            await expect(productsService.removeById('1')).rejects.toThrow(
                InvalidPayloadException
            );
        });
    });
});
