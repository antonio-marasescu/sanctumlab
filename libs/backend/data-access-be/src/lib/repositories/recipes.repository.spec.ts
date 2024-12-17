import { mock } from 'jest-mock-extended';
import { RecipeModel } from '../domain/database-types.domain';
import { Model } from 'dynamodb-onetable';
import { RecipesRepository } from './recipes.repository';
import { createMockRecipeModel } from '../domain/_mocks/recipe.domain.mocks';

describe('RecipesRepository', () => {
    let recipesRepository: RecipesRepository;
    let mockTable = mock<Model<RecipeModel>>();

    beforeEach(() => {
        mockTable = mock<Model<RecipeModel>>();
        recipesRepository = new RecipesRepository(mockTable);
    });

    it('should retrieve all Recipes', async () => {
        const mockRecipes: RecipeModel[] = [
            createMockRecipeModel({ id: '1', name: 'Recipe A' }),
            createMockRecipeModel({ id: '2', name: 'Recipe B' })
        ];
        mockTable.find.mockResolvedValue(mockRecipes);

        const result = await recipesRepository.retrieveAll();

        expect(result).toEqual(mockRecipes);
        expect(mockTable.find).toHaveBeenCalledTimes(1);
    });

    describe('retrieveById', () => {
        it('should retrieve a Recipe by ID', async () => {
            const mockRecipe: RecipeModel = createMockRecipeModel({
                id: '1',
                name: 'Recipe A'
            });
            mockTable.get.mockResolvedValue(mockRecipe);

            const result = await recipesRepository.retrieveById('1');

            expect(result).toEqual(mockRecipe);
            expect(mockTable.get).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.get).toHaveBeenCalledTimes(1);
        });

        it('should return undefined when Recipe not found', async () => {
            mockTable.get.mockResolvedValue(undefined);

            const result = await recipesRepository.retrieveById('1');

            expect(result).toBeUndefined();
            expect(mockTable.get).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.get).toHaveBeenCalledTimes(1);
        });
    });

    it('should create a Recipe', async () => {
        const mockRecipe: RecipeModel = createMockRecipeModel({
            id: '1',
            name: 'Recipe A'
        });
        mockTable.create.mockResolvedValue(mockRecipe);

        const result = await recipesRepository.create(mockRecipe);

        expect(result).toEqual(mockRecipe);
        expect(mockTable.create).toHaveBeenCalledWith(mockRecipe);
        expect(mockTable.create).toHaveBeenCalledTimes(1);
    });

    it('should update a Recipe', async () => {
        const id = '1';
        const mockRecipe: RecipeModel = createMockRecipeModel({
            id,
            name: 'Updated Recipe A'
        });
        mockTable.upsert.mockResolvedValue(mockRecipe);

        const result = await recipesRepository.update(id, mockRecipe);

        expect(result).toEqual(mockRecipe);
        expect(mockTable.upsert).toHaveBeenCalledWith({
            ...mockRecipe,
            id
        });
        expect(mockTable.upsert).toHaveBeenCalledTimes(1);
    });

    describe('removeById', () => {
        it('should remove a Recipe by ID', async () => {
            mockTable.remove.mockResolvedValue(
                createMockRecipeModel({
                    id: '1',
                    name: 'Recipe A'
                })
            );

            const result = await recipesRepository.removeById('1');

            expect(result).toBe(true);
            expect(mockTable.remove).toHaveBeenCalledWith({ id: '1' });
            expect(mockTable.remove).toHaveBeenCalledTimes(1);
        });

        it('should return false when trying to remove a non-existent Recipe', async () => {
            mockTable.remove.mockResolvedValue(undefined);

            const result =
                await recipesRepository.removeById('non-existent-id');

            expect(result).toBe(false);
            expect(mockTable.remove).toHaveBeenCalledWith({
                id: 'non-existent-id'
            });
            expect(mockTable.remove).toHaveBeenCalledTimes(1);
        });
    });
});
