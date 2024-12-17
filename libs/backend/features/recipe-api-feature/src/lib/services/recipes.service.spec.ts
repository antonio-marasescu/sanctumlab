import { mock } from 'jest-mock-extended';
import {
    createMockRecipeModel,
    RecipeModel,
    RecipesRepository
} from '@sanctumlab/be/data-access';
import {
    InvalidPayloadException,
    NotFoundException
} from '@sanctumlab/be/shared';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
    let recipesRepositoryMock = mock<RecipesRepository>();
    let recipesService: RecipesService;

    beforeEach(() => {
        recipesRepositoryMock = mock<RecipesRepository>();
        recipesService = new RecipesService(recipesRepositoryMock);
    });

    describe('retrieveAll', () => {
        it('should retrieve all Recipes', async () => {
            const mockRecipes = [
                createMockRecipeModel({ id: '1', name: 'Recipe A' }),
                createMockRecipeModel({ id: '2', name: 'Recipe B' })
            ];
            recipesRepositoryMock.retrieveAll.mockResolvedValue(mockRecipes);

            const result = await recipesService.retrieveAll();

            expect(result).toEqual(mockRecipes);
            expect(recipesRepositoryMock.retrieveAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('retrieveById', () => {
        it('should retrieve a Recipe by id', async () => {
            const mockRecipe = createMockRecipeModel({ id: '1' });
            recipesRepositoryMock.retrieveById.mockResolvedValue(mockRecipe);

            const result = await recipesService.retrieveById('1');

            expect(result).toEqual(mockRecipe);
            expect(recipesRepositoryMock.retrieveById).toHaveBeenCalledWith(
                '1'
            );
        });

        it('should throw NotFoundException if Recipe is not found', async () => {
            recipesRepositoryMock.retrieveById.mockResolvedValue(undefined);

            await expect(
                recipesService.retrieveById('unknown-id')
            ).rejects.toThrow(NotFoundException);
            expect(recipesRepositoryMock.retrieveById).toHaveBeenCalledWith(
                'unknown-id'
            );
        });
    });

    describe('create', () => {
        it('should create a new Recipe', async () => {
            const mockRecipe = createMockRecipeModel({
                id: '1'
            }) as Required<RecipeModel>;
            recipesRepositoryMock.create.mockResolvedValue(mockRecipe);

            const result = await recipesService.create(mockRecipe);

            expect(result).toEqual(mockRecipe);
            expect(recipesRepositoryMock.create).toHaveBeenCalledWith(
                mockRecipe
            );
        });

        it('should throw InvalidPayloadException on create failure', async () => {
            recipesRepositoryMock.create.mockRejectedValue(new Error());
            const mockRecipe = createMockRecipeModel({
                id: '1'
            }) as Required<RecipeModel>;
            await expect(recipesService.create(mockRecipe)).rejects.toThrow(
                InvalidPayloadException
            );
        });
    });

    describe('update', () => {
        it('should update an existing Recipe', async () => {
            const mockRecipe = createMockRecipeModel({
                id: '1'
            }) as Required<RecipeModel>;
            recipesRepositoryMock.update.mockResolvedValue(mockRecipe);

            const result = await recipesService.update('1', mockRecipe);

            expect(result).toEqual(mockRecipe);
            expect(recipesRepositoryMock.update).toHaveBeenCalledWith(
                '1',
                mockRecipe
            );
        });

        it('should throw InvalidPayloadException on update failure', async () => {
            recipesRepositoryMock.update.mockRejectedValue(new Error());

            await expect(
                recipesService.update('1', createMockRecipeModel({ id: '1' }))
            ).rejects.toThrow(InvalidPayloadException);
        });
    });

    describe('removeById', () => {
        it('should remove a Recipe by id', async () => {
            recipesRepositoryMock.removeById.mockResolvedValue(true);

            const result = await recipesService.removeById('1');

            expect(result).toBe(true);
            expect(recipesRepositoryMock.removeById).toHaveBeenCalledWith('1');
        });

        it('should throw InvalidPayloadException on remove failure', async () => {
            recipesRepositoryMock.removeById.mockRejectedValue(new Error());

            await expect(recipesService.removeById('1')).rejects.toThrow(
                InvalidPayloadException
            );
        });
    });
});
