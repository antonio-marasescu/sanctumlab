import { mock } from 'jest-mock-extended';
import { ProductModel } from '../domain/database-types.domain';
import { Model } from 'dynamodb-onetable';
import { ProductsRepository } from './products.repository';
import { createMockProductModel } from '../domain/_mocks/product.domain.mocks';

describe('ProductsRepository', () => {
    let productsRepository: ProductsRepository;
    let mockTable = mock<Model<ProductModel>>();

    beforeEach(() => {
        mockTable = mock<Model<ProductModel>>();
        productsRepository = new ProductsRepository(mockTable);
    });

    it('should retrieve all products', async () => {
        const mockProducts: ProductModel[] = [
            createMockProductModel({ id: '1', name: 'Product A' }),
            createMockProductModel({ id: '2', name: 'Product B' })
        ];
        mockTable.find.mockResolvedValue(mockProducts);

        const result = await productsRepository.retrieveAll();

        expect(result).toEqual(mockProducts);
        expect(mockTable.find).toHaveBeenCalledTimes(1);
    });

    describe('retrieveById', () => {
        it('should retrieve a product by ID', async () => {
            const mockProduct: ProductModel = createMockProductModel({
                id: '1',
                name: 'Product A'
            });
            mockTable.get.mockResolvedValue(mockProduct);

            const result = await productsRepository.retrieveById('1');

            expect(result).toEqual(mockProduct);
            expect(mockTable.get).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.get).toHaveBeenCalledTimes(1);
        });

        it('should return undefined when product not found', async () => {
            mockTable.get.mockResolvedValue(undefined);

            const result = await productsRepository.retrieveById('1');

            expect(result).toBeUndefined();
            expect(mockTable.get).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.get).toHaveBeenCalledTimes(1);
        });
    });

    it('should create a product', async () => {
        const mockProduct: ProductModel = createMockProductModel({
            id: '1',
            name: 'Product A'
        });
        mockTable.create.mockResolvedValue(mockProduct);

        const result = await productsRepository.create(mockProduct);

        expect(result).toEqual(mockProduct);
        expect(mockTable.create).toHaveBeenCalledWith(mockProduct);
        expect(mockTable.create).toHaveBeenCalledTimes(1);
    });

    it('should update a product', async () => {
        const id = '1';
        const mockProduct: ProductModel = createMockProductModel({
            id,
            name: 'Updated Product A'
        });
        mockTable.upsert.mockResolvedValue(mockProduct);

        const result = await productsRepository.update(id, mockProduct);

        expect(result).toEqual(mockProduct);
        expect(mockTable.upsert).toHaveBeenCalledWith({ ...mockProduct, id });
        expect(mockTable.upsert).toHaveBeenCalledTimes(1);
    });

    describe('removeById', () => {
        it('should remove a product by ID', async () => {
            mockTable.remove.mockResolvedValue(
                createMockProductModel({
                    id: '1',
                    name: 'Product A'
                })
            );

            const result = await productsRepository.removeById('1');

            expect(result).toBe(true);
            expect(mockTable.remove).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.remove).toHaveBeenCalledTimes(1);
        });

        it('should return false when trying to remove a non-existent product', async () => {
            mockTable.remove.mockResolvedValue(undefined);

            const result =
                await productsRepository.removeById('non-existent-id');

            expect(result).toBe(false);
            expect(mockTable.remove).toHaveBeenCalledWith({
                id: 'non-existent-id'
            });
            expect(mockTable.remove).toHaveBeenCalledTimes(1);
        });
    });
});
