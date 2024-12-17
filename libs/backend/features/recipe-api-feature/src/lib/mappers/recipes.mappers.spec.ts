import {
    createMockCreateRecipeDto,
    createMockRecipeDto,
    createMockUpdateRecipeDto,
    CreateRecipeDto,
    RecipeCategory,
    UpdateRecipeDto
} from '@sanctumlab/api-interfaces';
import {
    createMockRecipeModel,
    RecipeCategoryDomain,
    RecipeModel
} from '@sanctumlab/be/data-access';
import {
    toDomain,
    toDomainCreate,
    toDomainUpdate,
    toDto,
    toDtoList,
    toModelList
} from './recipes.mappers';

describe('recipesMappers', () => {
    describe('toDomain', () => {
        it('should convert RecipeDto to RecipeModel', () => {
            const mockRecipeDto = createMockRecipeDto({
                id: '1',
                name: 'Recipe A',
                category: RecipeCategory.Snacks,
                ingredients: ['12345']
            });

            const result = toDomain(mockRecipeDto);

            expect(result).toEqual({
                id: '1',
                name: 'Recipe A',
                description: mockRecipeDto.description,
                category: RecipeCategoryDomain.Snacks,
                ingredients: ['12345']
            });
        });
    });

    describe('toDomainCreate', () => {
        it('should create a new RecipeModel from CreateRecipeDto', () => {
            const mockCreateDto: CreateRecipeDto = createMockCreateRecipeDto({
                name: 'Nachos',
                category: RecipeCategory.Snacks,
                ingredients: ['12345']
            });

            const result = toDomainCreate(mockCreateDto);

            expect(result).toMatchObject({
                name: 'Nachos',
                description: mockCreateDto.description,
                category: RecipeCategoryDomain.Snacks,
                ingredients: ['12345']
            });
            expect(result.id).toBeDefined();
        });
    });

    describe('toDomainUpdate', () => {
        it('should update an existing RecipeModel with UpdateRecipeDto', () => {
            const mockOldModel = createMockRecipeModel({
                id: '1',
                name: 'Old Recipe'
            }) as Required<RecipeModel>;
            const mockUpdateDto: UpdateRecipeDto = createMockUpdateRecipeDto({
                name: 'Updated Recipe',
                category: RecipeCategory.Snacks,
                ingredients: ['12345']
            });

            const result = toDomainUpdate(mockOldModel, mockUpdateDto);

            expect(result).toEqual({
                id: '1',
                name: 'Updated Recipe',
                description: mockUpdateDto.description,
                category: RecipeCategoryDomain.Snacks,
                ingredients: ['12345']
            });
        });
    });

    describe('toDto', () => {
        it('should convert RecipeModel to RecipeDto', () => {
            const mockRecipeModel = createMockRecipeModel({
                id: '1',
                name: 'Recipe A',
                category: RecipeCategoryDomain.Snacks,
                ingredients: ['12345']
            });

            const result = toDto(mockRecipeModel);

            expect(result).toEqual({
                id: '1',
                name: 'Recipe A',
                description: mockRecipeModel.description,
                category: RecipeCategory.Snacks,
                ingredients: mockRecipeModel.ingredients
            });
        });
    });

    describe('toModelList', () => {
        it('should convert an array of RecipeDto to RecipeModel', () => {
            const mockDtoList = [
                createMockRecipeDto({ id: '1', name: 'Recipe A' }),
                createMockRecipeDto({ id: '2', name: 'Recipe B' })
            ];

            const result = toModelList(mockDtoList);

            expect(result.length).toBe(2);
            expect(result[0].name).toBe('Recipe A');
            expect(result[1].name).toBe('Recipe B');
        });
    });

    describe('toDtoList', () => {
        it('should convert an array of RecipeModel to RecipeDto', () => {
            const mockModelList = [
                createMockRecipeModel({ id: '1', name: 'Recipe A' }),
                createMockRecipeModel({ id: '2', name: 'Recipe B' })
            ];

            const result = toDtoList(mockModelList);

            expect(result.length).toBe(2);
            expect(result[0].name).toBe('Recipe A');
            expect(result[1].name).toBe('Recipe B');
        });
    });
});
