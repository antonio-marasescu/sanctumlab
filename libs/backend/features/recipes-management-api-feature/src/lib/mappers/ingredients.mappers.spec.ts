import {
    CreateIngredientDto,
    createMockCreateIngredientDto,
    createMockIngredientDto,
    createMockUpdateIngredientDto,
    UpdateIngredientDto
} from '@sanctumlab/api-interfaces';
import {
    createMockIngredientModel,
    IngredientModel
} from '@sanctumlab/be/data-access';
import {
    toDomain,
    toDomainCreate,
    toDomainUpdate,
    toDto,
    toDtoList,
    toModelList
} from './ingredients.mappers';

describe('ingredientsMappers', () => {
    describe('toDomain', () => {
        it('should convert IngredientDto to IngredientModel', () => {
            const mockIngredientDto = createMockIngredientDto({
                id: '1',
                name: 'Lime',
                icon: 'assets/lime.svg',
                quantity: 1
            });

            const result = toDomain(mockIngredientDto);

            expect(result).toEqual({
                id: '1',
                name: 'Lime',
                icon: 'assets/lime.svg',
                quantity: 1
            });
        });
    });

    describe('toDomainCreate', () => {
        it('should create a new IngredientModel from CreateIngredientDto', () => {
            const mockCreateDto: CreateIngredientDto =
                createMockCreateIngredientDto({
                    name: 'Nachos'
                });

            const result = toDomainCreate(mockCreateDto);

            expect(result).toMatchObject({
                name: 'Nachos',
                icon: mockCreateDto.icon,
                quantity: mockCreateDto.quantity
            });
            expect(result.id).toBeDefined();
        });
    });

    describe('toDomainUpdate', () => {
        it('should update an existing IngredientModel with UpdateIngredientDto', () => {
            const mockOldModel = createMockIngredientModel({
                id: '1',
                name: 'Old Ingredient',
                icon: 'assets/lime.svg'
            }) as Required<IngredientModel>;
            const mockUpdateDto: UpdateIngredientDto =
                createMockUpdateIngredientDto({
                    name: 'Updated Ingredient'
                });

            const result = toDomainUpdate(mockOldModel, mockUpdateDto);

            expect(result).toEqual({
                id: '1',
                name: 'Updated Ingredient',
                icon: mockOldModel.icon,
                quantity: mockOldModel.quantity
            });
        });
    });

    describe('toDto', () => {
        it('should convert IngredientModel to IngredientDto', () => {
            const mockIngredientModel = createMockIngredientModel({
                id: '1',
                name: 'Ingredient A'
            });

            const result = toDto(mockIngredientModel);

            expect(result).toEqual({
                id: '1',
                name: 'Ingredient A',
                icon: mockIngredientModel.icon,
                quantity: mockIngredientModel.quantity
            });
        });
    });

    describe('toModelList', () => {
        it('should convert an array of IngredientDto to IngredientModel', () => {
            const mockDtoList = [
                createMockIngredientDto({ id: '1', name: 'Ingredient A' }),
                createMockIngredientDto({ id: '2', name: 'Ingredient B' })
            ];

            const result = toModelList(mockDtoList);

            expect(result.length).toBe(2);
            expect(result[0].name).toBe('Ingredient A');
            expect(result[1].name).toBe('Ingredient B');
        });
    });

    describe('toDtoList', () => {
        it('should convert an array of IngredientModel to IngredientDto', () => {
            const mockModelList = [
                createMockIngredientModel({ id: '1', name: 'Ingredient A' }),
                createMockIngredientModel({ id: '2', name: 'Ingredient B' })
            ];

            const result = toDtoList(mockModelList);

            expect(result.length).toBe(2);
            expect(result[0].name).toBe('Ingredient A');
            expect(result[1].name).toBe('Ingredient B');
        });
    });
});
