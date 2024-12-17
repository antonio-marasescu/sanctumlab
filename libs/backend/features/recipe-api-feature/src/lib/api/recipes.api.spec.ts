import { mock } from 'jest-mock-extended';
import {
    createMockCreateRecipeDto,
    createMockRecipeDto,
    createMockUpdateRecipeDto,
    RecipeCategory
} from '@sanctumlab/api-interfaces';
import {
    InvalidPayloadException,
    mockAppLogger,
    NotAuthorizedException,
    NotFoundException
} from '@sanctumlab/be/shared';
import {
    createMockRecipeModel,
    RecipeCategoryDomain,
    RecipeModel
} from '@sanctumlab/be/data-access';
import { ZodError } from 'zod';
import { createMockVerifiedContext } from '@sanctumlab/be/auth';
import { RecipesService } from '../services/recipes.service';
import { RecipesApi } from './recipes.api';

describe('RecipesApi', () => {
    let recipesServiceMock = mock<RecipesService>();
    let recipesApi: RecipesApi;

    beforeEach(() => {
        mockAppLogger(jest);
        recipesServiceMock = mock<RecipesService>();
        recipesApi = new RecipesApi(recipesServiceMock);
    });

    describe('retrieveAll', () => {
        it('should retrieve all recipes', async () => {
            const mockRecipesModel = [
                createMockRecipeModel({ id: '1', name: 'Recipe A' }),
                createMockRecipeModel({ id: '2', name: 'Recipe B' })
            ];
            recipesServiceMock.retrieveAll.mockResolvedValue(mockRecipesModel);
            const expectedRecipesDto = [
                createMockRecipeDto({ id: '1', name: 'Recipe A' }),
                createMockRecipeDto({ id: '2', name: 'Recipe B' })
            ];

            const result = await recipesApi.retrieveAll(
                createMockVerifiedContext()
            );

            expect(result).toEqual(expectedRecipesDto);
            expect(recipesServiceMock.retrieveAll).toHaveBeenCalledTimes(1);
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            await expect(
                recipesApi.retrieveAll(
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(new NotAuthorizedException());
        });
    });

    describe('retrieveById', () => {
        it('should retrieve a recipe by id', async () => {
            const mockRecipeDto = createMockRecipeDto({
                id: '1',
                name: 'Recipe A'
            });
            const mockRecipeModel = createMockRecipeModel({
                id: '1',
                name: 'Recipe A'
            });
            recipesServiceMock.retrieveById.mockResolvedValue(mockRecipeModel);

            const result = await recipesApi.retrieveById(
                '1',
                createMockVerifiedContext()
            );

            expect(result).toEqual(mockRecipeDto);
            expect(recipesServiceMock.retrieveById).toHaveBeenCalledWith('1');
        });

        it('should throw NotFoundException if recipe is not found', async () => {
            recipesServiceMock.retrieveById.mockRejectedValue(
                new NotFoundException()
            );

            await expect(
                recipesApi.retrieveById(
                    'unknown-id',
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(NotFoundException);
            expect(recipesServiceMock.retrieveById).toHaveBeenCalledWith(
                'unknown-id'
            );
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            await expect(
                recipesApi.retrieveById(
                    '1',
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(new NotAuthorizedException());
        });
    });

    describe('removeById', () => {
        it('should remove a recipe by id', async () => {
            recipesServiceMock.removeById.mockResolvedValue(true);

            const result = await recipesApi.removeById(
                '1',
                createMockVerifiedContext()
            );

            expect(result).toBe(true);
            expect(recipesServiceMock.removeById).toHaveBeenCalledWith('1');
        });

        it('should throw InvalidPayloadException on remove failure', async () => {
            recipesServiceMock.removeById.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                recipesApi.removeById('1', createMockVerifiedContext())
            ).rejects.toThrow(new InvalidPayloadException());
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            await expect(
                recipesApi.removeById(
                    '1',
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(new NotAuthorizedException());
        });
    });

    describe('create', () => {
        it('should create a new recipe', async () => {
            const mockCreateDto = createMockCreateRecipeDto({
                name: 'Cuba Libre',
                description: 'How to make cuba libre',
                ingredients: ['12345'],
                category: RecipeCategory.Drinks
            });
            const mockRecipeModel = createMockRecipeModel({
                id: '1',
                name: 'Cuba Libre',
                description: 'How to make cuba libre',
                ingredients: ['12345'],
                category: RecipeCategoryDomain.Drinks
            }) as Required<RecipeModel>;
            const mockExpectedRecipe = createMockRecipeDto({
                id: '1',
                name: 'Cuba Libre',
                description: 'How to make cuba libre',
                ingredients: ['12345'],
                category: RecipeCategory.Drinks
            });

            recipesServiceMock.create.mockResolvedValue(mockRecipeModel);

            const result = await recipesApi.create(
                mockCreateDto,
                createMockVerifiedContext()
            );

            expect(result).toEqual(mockExpectedRecipe);
            expect(recipesServiceMock.create).toHaveBeenCalledWith(
                expect.anything()
            );
        });

        it('should throw ZodError on invalid dto payload', async () => {
            const mockCreateDto = createMockCreateRecipeDto({
                name: undefined,
                description: ''
            });

            await expect(
                recipesApi.create(mockCreateDto, createMockVerifiedContext())
            ).rejects.toThrow(ZodError);
        });

        it('should throw InvalidPayloadException on create failure', async () => {
            const mockCreateDto = createMockCreateRecipeDto();
            recipesServiceMock.create.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                recipesApi.create(mockCreateDto, createMockVerifiedContext())
            ).rejects.toThrow(InvalidPayloadException);
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            const mockCreateDto = createMockCreateRecipeDto();

            await expect(
                recipesApi.create(
                    mockCreateDto,
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(NotAuthorizedException);
        });
    });

    describe('update', () => {
        it('should update a recipe', async () => {
            const mockUpdateDto = createMockUpdateRecipeDto({
                name: 'Cuba Libre Updated',
                description: 'How to make cuba libre',
                ingredients: ['12345'],
                category: RecipeCategory.Drinks
            });
            const mockOldRecipeModel = createMockRecipeModel({
                id: '1',
                name: 'Cuba Libre',
                description: 'How to make cuba libre',
                ingredients: ['12345'],
                category: RecipeCategoryDomain.Drinks
            }) as Required<RecipeModel>;
            const mockRecipeModel = createMockRecipeModel({
                id: '1',
                name: 'Cuba Libre Updated',
                description: 'How to make cuba libre',
                ingredients: ['12345'],
                category: RecipeCategoryDomain.Drinks
            }) as Required<RecipeModel>;
            const mockExpectedRecipe = createMockRecipeDto({
                id: '1',
                name: 'Cuba Libre Updated',
                description: 'How to make cuba libre',
                ingredients: ['12345'],
                category: RecipeCategory.Drinks
            });

            recipesServiceMock.retrieveById.mockResolvedValue(
                mockOldRecipeModel
            );
            recipesServiceMock.update.mockResolvedValue(mockRecipeModel);

            const result = await recipesApi.update(
                '1',
                mockUpdateDto,
                createMockVerifiedContext()
            );

            expect(result).toEqual(mockExpectedRecipe);
            expect(recipesServiceMock.update).toHaveBeenCalledWith(
                '1',
                expect.anything()
            );
        });

        it('should throw InvalidPayloadException on update failure', async () => {
            const mockUpdateDto = createMockUpdateRecipeDto();
            const mockOldRecipeModel = createMockRecipeModel({
                id: '1'
            }) as Required<RecipeModel>;
            recipesServiceMock.retrieveById.mockResolvedValue(
                mockOldRecipeModel
            );
            recipesServiceMock.update.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                recipesApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(InvalidPayloadException);
        });

        it('should throw NotFoundException on retrieve old model failure', async () => {
            const mockUpdateDto = createMockUpdateRecipeDto();
            recipesServiceMock.retrieveById.mockRejectedValue(
                new NotFoundException()
            );

            await expect(
                recipesApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(NotFoundException);
        });

        it('should throw ZodError on invalid dto payload', async () => {
            const mockUpdateDto = createMockUpdateRecipeDto({
                name: undefined,
                description: ''
            });

            await expect(
                recipesApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(ZodError);
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            const mockUpdateDto = createMockUpdateRecipeDto({
                name: undefined,
                description: ''
            });

            await expect(
                recipesApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(NotAuthorizedException);
        });
    });
});
