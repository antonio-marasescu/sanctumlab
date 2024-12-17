import { mock } from 'jest-mock-extended';
import { IngredientsService } from '../services/ingredients.service';
import {
    createMockCreateIngredientDto,
    createMockIngredientDto,
    createMockUpdateIngredientDto
} from '@sanctumlab/api-interfaces';
import {
    InvalidPayloadException,
    mockAppLogger,
    NotAuthorizedException,
    NotFoundException
} from '@sanctumlab/be/shared';
import { IngredientsApi } from './ingredients.api';
import {
    createMockIngredientModel,
    IngredientModel
} from '@sanctumlab/be/data-access';
import { ZodError } from 'zod';
import { createMockVerifiedContext } from '@sanctumlab/be/auth';

describe('IngredientsApi', () => {
    let ingredientsServiceMock = mock<IngredientsService>();
    let ingredientsApi: IngredientsApi;

    beforeEach(() => {
        mockAppLogger(jest);
        ingredientsServiceMock = mock<IngredientsService>();
        ingredientsApi = new IngredientsApi(ingredientsServiceMock);
    });

    describe('retrieveAll', () => {
        it('should retrieve all ingredients', async () => {
            const mockIngredientsModel = [
                createMockIngredientModel({
                    id: '1',
                    name: 'Ingredient A',
                    icon: 'assets/ingredient-a.svg'
                }),
                createMockIngredientModel({
                    id: '2',
                    name: 'Ingredient B',
                    icon: 'assets/ingredient-b.svg'
                })
            ];
            ingredientsServiceMock.retrieveAll.mockResolvedValue(
                mockIngredientsModel
            );
            const expectedIngredientsDto = [
                createMockIngredientDto({
                    id: '1',
                    name: 'Ingredient A',
                    icon: 'assets/ingredient-a.svg'
                }),
                createMockIngredientDto({
                    id: '2',
                    name: 'Ingredient B',
                    icon: 'assets/ingredient-b.svg'
                })
            ];

            const result = await ingredientsApi.retrieveAll(
                createMockVerifiedContext()
            );

            expect(result).toEqual(expectedIngredientsDto);
            expect(ingredientsServiceMock.retrieveAll).toHaveBeenCalledTimes(1);
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            await expect(
                ingredientsApi.retrieveAll(
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(new NotAuthorizedException());
        });
    });

    describe('retrieveById', () => {
        it('should retrieve a ingredient by id', async () => {
            const mockIngredientDto = createMockIngredientDto({
                id: '1',
                name: 'Ingredient A',
                icon: 'assets/ingredient-a.svg'
            });
            const mockIngredientModel = createMockIngredientModel({
                id: '1',
                name: 'Ingredient A',
                icon: 'assets/ingredient-a.svg'
            });
            ingredientsServiceMock.retrieveById.mockResolvedValue(
                mockIngredientModel
            );

            const result = await ingredientsApi.retrieveById(
                '1',
                createMockVerifiedContext()
            );

            expect(result).toEqual(mockIngredientDto);
            expect(ingredientsServiceMock.retrieveById).toHaveBeenCalledWith(
                '1'
            );
        });

        it('should throw NotFoundException if ingredient is not found', async () => {
            ingredientsServiceMock.retrieveById.mockRejectedValue(
                new NotFoundException()
            );

            await expect(
                ingredientsApi.retrieveById(
                    'unknown-id',
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(NotFoundException);
            expect(ingredientsServiceMock.retrieveById).toHaveBeenCalledWith(
                'unknown-id'
            );
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            await expect(
                ingredientsApi.retrieveById(
                    '1',
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(new NotAuthorizedException());
        });
    });

    describe('removeById', () => {
        it('should remove a ingredient by id', async () => {
            ingredientsServiceMock.removeById.mockResolvedValue(true);

            const result = await ingredientsApi.removeById(
                '1',
                createMockVerifiedContext()
            );

            expect(result).toBe(true);
            expect(ingredientsServiceMock.removeById).toHaveBeenCalledWith('1');
        });

        it('should throw InvalidPayloadException on remove failure', async () => {
            ingredientsServiceMock.removeById.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                ingredientsApi.removeById('1', createMockVerifiedContext())
            ).rejects.toThrow(new InvalidPayloadException());
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            await expect(
                ingredientsApi.removeById(
                    '1',
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(new NotAuthorizedException());
        });
    });

    describe('create', () => {
        it('should create a new ingredient', async () => {
            const mockCreateDto = createMockCreateIngredientDto({
                name: 'Lime',
                icon: 'assets/lime.svg',
                quantity: 1
            });
            const mockIngredientModel = createMockIngredientModel({
                id: '1',
                name: 'Lime',
                icon: 'assets/lime.svg',
                quantity: 1
            }) as Required<IngredientModel>;
            const mockExpectedIngredient = createMockIngredientDto({
                id: '1',
                name: 'Lime',
                icon: 'assets/lime.svg',
                quantity: 1
            });

            ingredientsServiceMock.create.mockResolvedValue(
                mockIngredientModel
            );

            const result = await ingredientsApi.create(
                mockCreateDto,
                createMockVerifiedContext()
            );

            expect(result).toEqual(mockExpectedIngredient);
            expect(ingredientsServiceMock.create).toHaveBeenCalledWith(
                expect.anything()
            );
        });

        it('should throw ZodError on invalid dto payload', async () => {
            const mockCreateDto = createMockCreateIngredientDto({
                name: undefined,
                icon: ''
            });

            await expect(
                ingredientsApi.create(
                    mockCreateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(ZodError);
        });

        it('should throw InvalidPayloadException on create failure', async () => {
            const mockCreateDto = createMockCreateIngredientDto();
            ingredientsServiceMock.create.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                ingredientsApi.create(
                    mockCreateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(InvalidPayloadException);
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            const mockCreateDto = createMockCreateIngredientDto();

            await expect(
                ingredientsApi.create(
                    mockCreateDto,
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(NotAuthorizedException);
        });
    });

    describe('update', () => {
        it('should update a ingredient', async () => {
            const mockUpdateDto = createMockUpdateIngredientDto({
                name: 'Lime Updated',
                icon: 'assets/lime.svg',
                quantity: 1
            });
            const mockOldIngredientModel = createMockIngredientModel({
                id: '1',
                name: 'Lime',
                icon: 'assets/lime.svg',
                quantity: 1
            }) as Required<IngredientModel>;
            const mockIngredientModel = createMockIngredientModel({
                id: '1',
                name: 'Lime Updated',
                icon: 'assets/lime.svg',
                quantity: 1
            }) as Required<IngredientModel>;
            const mockExpectedIngredient = createMockIngredientDto({
                id: '1',
                name: 'Lime Updated',
                icon: 'assets/lime.svg',
                quantity: 1
            });

            ingredientsServiceMock.retrieveById.mockResolvedValue(
                mockOldIngredientModel
            );
            ingredientsServiceMock.update.mockResolvedValue(
                mockIngredientModel
            );

            const result = await ingredientsApi.update(
                '1',
                mockUpdateDto,
                createMockVerifiedContext()
            );

            expect(result).toEqual(mockExpectedIngredient);
            expect(ingredientsServiceMock.update).toHaveBeenCalledWith(
                '1',
                expect.anything()
            );
        });

        it('should throw InvalidPayloadException on update failure', async () => {
            const mockUpdateDto = createMockUpdateIngredientDto();
            const mockOldIngredientModel = createMockIngredientModel({
                id: '1'
            }) as Required<IngredientModel>;
            ingredientsServiceMock.retrieveById.mockResolvedValue(
                mockOldIngredientModel
            );
            ingredientsServiceMock.update.mockRejectedValue(
                new InvalidPayloadException()
            );

            await expect(
                ingredientsApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(InvalidPayloadException);
        });

        it('should throw NotFoundException on retrieve old model failure', async () => {
            const mockUpdateDto = createMockUpdateIngredientDto();
            ingredientsServiceMock.retrieveById.mockRejectedValue(
                new NotFoundException()
            );

            await expect(
                ingredientsApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(NotFoundException);
        });

        it('should throw ZodError on invalid dto payload', async () => {
            const mockUpdateDto = createMockUpdateIngredientDto({
                name: undefined,
                icon: ''
            });

            await expect(
                ingredientsApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext()
                )
            ).rejects.toThrow(ZodError);
        });

        it('should throw NotAuthorized on user context without ADMIN role', async () => {
            const mockUpdateDto = createMockUpdateIngredientDto({
                name: undefined,
                icon: ''
            });

            await expect(
                ingredientsApi.update(
                    '1',
                    mockUpdateDto,
                    createMockVerifiedContext({ roles: 'user' })
                )
            ).rejects.toThrow(NotAuthorizedException);
        });
    });
});
