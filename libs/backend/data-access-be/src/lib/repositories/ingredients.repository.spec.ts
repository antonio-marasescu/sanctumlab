import { mock } from 'jest-mock-extended';
import { IngredientModel } from '../domain/database-types.domain';
import { Model } from 'dynamodb-onetable';
import { IngredientsRepository } from './ingredients.repository';
import { createMockIngredientModel } from '../domain/_mocks/ingredient.domain.mocks';

describe('IngredientsRepository', () => {
    let ingredientsRepository: IngredientsRepository;
    let mockTable = mock<Model<IngredientModel>>();

    beforeEach(() => {
        mockTable = mock<Model<IngredientModel>>();
        ingredientsRepository = new IngredientsRepository(mockTable);
    });

    it('should retrieve all Ingredients', async () => {
        const mockIngredients: IngredientModel[] = [
            createMockIngredientModel({ id: '1', name: 'Ingredient A' }),
            createMockIngredientModel({ id: '2', name: 'Ingredient B' })
        ];
        mockTable.find.mockResolvedValue(mockIngredients);

        const result = await ingredientsRepository.retrieveAll();

        expect(result).toEqual(mockIngredients);
        expect(mockTable.find).toHaveBeenCalledTimes(1);
    });

    describe('retrieveById', () => {
        it('should retrieve a Ingredient by ID', async () => {
            const mockIngredient: IngredientModel = createMockIngredientModel({
                id: '1',
                name: 'Ingredient A'
            });
            mockTable.get.mockResolvedValue(mockIngredient);

            const result = await ingredientsRepository.retrieveById('1');

            expect(result).toEqual(mockIngredient);
            expect(mockTable.get).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.get).toHaveBeenCalledTimes(1);
        });

        it('should return undefined when Ingredient not found', async () => {
            mockTable.get.mockResolvedValue(undefined);

            const result = await ingredientsRepository.retrieveById('1');

            expect(result).toBeUndefined();
            expect(mockTable.get).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.get).toHaveBeenCalledTimes(1);
        });
    });

    it('should create a Ingredient', async () => {
        const mockIngredient: IngredientModel = createMockIngredientModel({
            id: '1',
            name: 'Ingredient A'
        });
        mockTable.create.mockResolvedValue(mockIngredient);

        const result = await ingredientsRepository.create(mockIngredient);

        expect(result).toEqual(mockIngredient);
        expect(mockTable.create).toHaveBeenCalledWith(mockIngredient);
        expect(mockTable.create).toHaveBeenCalledTimes(1);
    });

    it('should update a Ingredient', async () => {
        const id = '1';
        const mockIngredient: IngredientModel = createMockIngredientModel({
            id,
            name: 'Updated Ingredient A'
        });
        mockTable.upsert.mockResolvedValue(mockIngredient);

        const result = await ingredientsRepository.update(id, mockIngredient);

        expect(result).toEqual(mockIngredient);
        expect(mockTable.upsert).toHaveBeenCalledWith({
            ...mockIngredient,
            id
        });
        expect(mockTable.upsert).toHaveBeenCalledTimes(1);
    });

    describe('removeById', () => {
        it('should remove a Ingredient by ID', async () => {
            mockTable.remove.mockResolvedValue(
                createMockIngredientModel({
                    id: '1',
                    name: 'Ingredient A'
                })
            );

            const result = await ingredientsRepository.removeById('1');

            expect(result).toBe(true);
            expect(mockTable.remove).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.remove).toHaveBeenCalledTimes(1);
        });

        it('should return false when trying to remove a non-existent Ingredient', async () => {
            mockTable.remove.mockResolvedValue(undefined);

            const result =
                await ingredientsRepository.removeById('non-existent-id');

            expect(result).toBe(false);
            expect(mockTable.remove).toHaveBeenCalledWith({
                id: 'non-existent-id'
            });
            expect(mockTable.remove).toHaveBeenCalledTimes(1);
        });
    });
});
