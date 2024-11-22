import {
    createMockCreateProductItemDto,
    createMockProductItemDto,
    createMockUpdateProductItemDto,
    CreateProductItemDto,
    ProductItemCategory,
    UpdateProductItemDto
} from '@sanctumlab/api-interfaces';
import {
    createMockProductModel,
    ProductItemCategoryDomain,
    ProductModel
} from '@sanctumlab/be/data-access';
import {
    toDomain,
    toDomainCreate,
    toDomainUpdate,
    toDto,
    toDtoList,
    toModelList
} from './products.mappers';

describe('productsMappers', () => {
    describe('toDomain', () => {
        it('should convert ProductItemDto to ProductModel', () => {
            const mockProductDto = createMockProductItemDto({
                id: '1',
                name: 'Product A',
                category: ProductItemCategory.Snacks
            });

            const result = toDomain(mockProductDto);

            expect(result).toEqual({
                id: '1',
                name: 'Product A',
                description: mockProductDto.description,
                recipe: mockProductDto.recipe,
                category: ProductItemCategoryDomain.Snacks,
                tags: mockProductDto.tags,
                available: mockProductDto.available
            });
        });
    });

    describe('toDomainCreate', () => {
        it('should create a new ProductModel from CreateProductItemDto', () => {
            const mockCreateDto: CreateProductItemDto =
                createMockCreateProductItemDto({
                    name: 'Nachos',
                    category: ProductItemCategory.Snacks
                });

            const result = toDomainCreate(mockCreateDto);

            expect(result).toMatchObject({
                name: 'Nachos',
                description: mockCreateDto.description,
                recipe: mockCreateDto.recipe,
                category: ProductItemCategoryDomain.Snacks,
                tags: mockCreateDto.tags,
                available: mockCreateDto.available
            });
            expect(result.id).toBeDefined();
        });
    });

    describe('toDomainUpdate', () => {
        it('should update an existing ProductModel with UpdateProductItemDto', () => {
            const mockOldModel = createMockProductModel({
                id: '1',
                name: 'Old Product'
            }) as Required<ProductModel>;
            const mockUpdateDto: UpdateProductItemDto =
                createMockUpdateProductItemDto({
                    name: 'Updated Product',
                    category: ProductItemCategory.Snacks
                });

            const result = toDomainUpdate(mockOldModel, mockUpdateDto);

            expect(result).toEqual({
                id: '1',
                name: 'Updated Product',
                description: mockUpdateDto.description,
                recipe: mockUpdateDto.recipe,
                category: ProductItemCategoryDomain.Snacks,
                tags: mockUpdateDto.tags,
                available: mockUpdateDto.available
            });
        });
    });

    describe('toDto', () => {
        it('should convert ProductModel to ProductItemDto', () => {
            const mockProductModel = createMockProductModel({
                id: '1',
                name: 'Product A',
                category: ProductItemCategoryDomain.Snacks
            });

            const result = toDto(mockProductModel);

            expect(result).toEqual({
                id: '1',
                name: 'Product A',
                description: mockProductModel.description,
                recipe: mockProductModel.recipe,
                category: ProductItemCategory.Snacks,
                tags: mockProductModel.tags,
                available: mockProductModel.available
            });
        });
    });

    describe('toModelList', () => {
        it('should convert an array of ProductItemDto to ProductModel', () => {
            const mockDtoList = [
                createMockProductItemDto({ id: '1', name: 'Product A' }),
                createMockProductItemDto({ id: '2', name: 'Product B' })
            ];

            const result = toModelList(mockDtoList);

            expect(result.length).toBe(2);
            expect(result[0].name).toBe('Product A');
            expect(result[1].name).toBe('Product B');
        });
    });

    describe('toDtoList', () => {
        it('should convert an array of ProductModel to ProductItemDto', () => {
            const mockModelList = [
                createMockProductModel({ id: '1', name: 'Product A' }),
                createMockProductModel({ id: '2', name: 'Product B' })
            ];

            const result = toDtoList(mockModelList);

            expect(result.length).toBe(2);
            expect(result[0].name).toBe('Product A');
            expect(result[1].name).toBe('Product B');
        });
    });
});
