import { mock } from 'jest-mock-extended';
import {
    createMockIngredientModel,
    IngredientModel,
    IngredientsRepository
} from '@sanctumlab/be/data-access';
import {
    InvalidPayloadException,
    NotFoundException
} from '@sanctumlab/be/shared';
import { IngredientsService } from './ingredients.service';

describe('IngredientsService', () => {
    let ingredientsRepositoryMock = mock<IngredientsRepository>();
    let ingredientsService: IngredientsService;

    beforeEach(() => {
        ingredientsRepositoryMock = mock<IngredientsRepository>();
        ingredientsService = new IngredientsService(ingredientsRepositoryMock);
    });

    describe('retrieveAll', () => {
        it('should retrieve all Ingredients', async () => {
            const mockIngredients = [
                createMockIngredientModel({ id: '1', name: 'Ingredient A' }),
                createMockIngredientModel({ id: '2', name: 'Ingredient B' })
            ];
            ingredientsRepositoryMock.retrieveAll.mockResolvedValue(
                mockIngredients
            );

            const result = await ingredientsService.retrieveAll();

            expect(result).toEqual(mockIngredients);
            expect(ingredientsRepositoryMock.retrieveAll).toHaveBeenCalledTimes(
                1
            );
        });
    });

    describe('retrieveById', () => {
        it('should retrieve a Ingredient by id', async () => {
            const mockIngredient = createMockIngredientModel({ id: '1' });
            ingredientsRepositoryMock.retrieveById.mockResolvedValue(
                mockIngredient
            );

            const result = await ingredientsService.retrieveById('1');

            expect(result).toEqual(mockIngredient);
            expect(ingredientsRepositoryMock.retrieveById).toHaveBeenCalledWith(
                '1'
            );
        });

        it('should throw NotFoundException if Ingredient is not found', async () => {
            ingredientsRepositoryMock.retrieveById.mockResolvedValue(undefined);

            await expect(
                ingredientsService.retrieveById('unknown-id')
            ).rejects.toThrow(NotFoundException);
            expect(ingredientsRepositoryMock.retrieveById).toHaveBeenCalledWith(
                'unknown-id'
            );
        });
    });

    describe('create', () => {
        it('should create a new Ingredient', async () => {
            const mockIngredient = createMockIngredientModel({
                id: '1'
            }) as Required<IngredientModel>;
            ingredientsRepositoryMock.create.mockResolvedValue(mockIngredient);

            const result = await ingredientsService.create(mockIngredient);

            expect(result).toEqual(mockIngredient);
            expect(ingredientsRepositoryMock.create).toHaveBeenCalledWith(
                mockIngredient
            );
        });

        it('should throw InvalidPayloadException on create failure', async () => {
            ingredientsRepositoryMock.create.mockRejectedValue(new Error());
            const mockIngredient = createMockIngredientModel({
                id: '1'
            }) as Required<IngredientModel>;
            await expect(
                ingredientsService.create(mockIngredient)
            ).rejects.toThrow(InvalidPayloadException);
        });
    });

    describe('update', () => {
        it('should update an existing Ingredient', async () => {
            const mockIngredient = createMockIngredientModel({
                id: '1'
            }) as Required<IngredientModel>;
            ingredientsRepositoryMock.update.mockResolvedValue(mockIngredient);

            const result = await ingredientsService.update('1', mockIngredient);

            expect(result).toEqual(mockIngredient);
            expect(ingredientsRepositoryMock.update).toHaveBeenCalledWith(
                '1',
                mockIngredient
            );
        });

        it('should throw InvalidPayloadException on update failure', async () => {
            ingredientsRepositoryMock.update.mockRejectedValue(new Error());

            await expect(
                ingredientsService.update(
                    '1',
                    createMockIngredientModel({ id: '1' })
                )
            ).rejects.toThrow(InvalidPayloadException);
        });
    });

    describe('removeById', () => {
        it('should remove a Ingredient by id', async () => {
            ingredientsRepositoryMock.removeById.mockResolvedValue(true);

            const result = await ingredientsService.removeById('1');

            expect(result).toBe(true);
            expect(ingredientsRepositoryMock.removeById).toHaveBeenCalledWith(
                '1'
            );
        });

        it('should throw InvalidPayloadException on remove failure', async () => {
            ingredientsRepositoryMock.removeById.mockRejectedValue(new Error());

            await expect(ingredientsService.removeById('1')).rejects.toThrow(
                InvalidPayloadException
            );
        });
    });
});
