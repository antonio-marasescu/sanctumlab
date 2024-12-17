import {
    CreateIngredientDto,
    CreateIngredientDtoSchema,
    IngredientDto,
    UpdateIngredientDto,
    UpdateIngredientDtoSchema
} from '@sanctumlab/api-interfaces';
import {
    IngredientsService,
    IngredientsServiceInstance
} from '../services/ingredients.service';
import {
    toDomainCreate,
    toDomainUpdate,
    toDto,
    toDtoList
} from '../mappers/ingredients.mappers';
import { AppLogger, RequiresRole } from '@sanctumlab/be/shared';
import { UserRole, VerifiedTokenContext } from '@sanctumlab/be/auth';

export class IngredientsApi {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @RequiresRole(UserRole.ADMIN)
    public async retrieveAll(
        ctx: VerifiedTokenContext
    ): Promise<IngredientDto[]> {
        AppLogger.info(`[IngredientsApi] Retrieve All `, { user: ctx.sub });
        const response = await this.ingredientsService.retrieveAll();
        AppLogger.info(`[IngredientsApi] Retrieve All Success`, {
            length: response.length,
            user: ctx.sub
        });
        return toDtoList(response);
    }

    @RequiresRole(UserRole.ADMIN)
    public async retrieveById(
        id: string,
        ctx: VerifiedTokenContext
    ): Promise<IngredientDto> {
        AppLogger.info(`[IngredientsApi] Retrieve By Id `, {
            id,
            user: ctx.sub
        });
        const response = await this.ingredientsService.retrieveById(id);
        AppLogger.info(`[IngredientsApi] Retrieve By Id Success`, {
            retrievedId: response.id,
            user: ctx.sub
        });
        return toDto(response);
    }

    @RequiresRole(UserRole.ADMIN)
    public async create(
        dto: CreateIngredientDto,
        ctx: VerifiedTokenContext
    ): Promise<IngredientDto> {
        AppLogger.info(`[IngredientsApi] Create `, { dto, user: ctx.sub });
        const validatedDto = CreateIngredientDtoSchema.parse(dto);
        const response = await this.ingredientsService.create(
            toDomainCreate(validatedDto)
        );
        AppLogger.info(`[IngredientsApi] Create Success`, {
            response,
            user: ctx.sub
        });
        return toDto(response);
    }

    @RequiresRole(UserRole.ADMIN)
    public async update(
        id: string,
        dto: UpdateIngredientDto,
        ctx: VerifiedTokenContext
    ): Promise<IngredientDto> {
        AppLogger.info(`[IngredientsApi] Update `, { id, dto, user: ctx.sub });
        const validatedDto = UpdateIngredientDtoSchema.parse(dto);
        const oldModel = await this.ingredientsService.retrieveById(id);

        const response = await this.ingredientsService.update(
            id,
            toDomainUpdate(oldModel, validatedDto)
        );
        AppLogger.info(`[IngredientsApi] Update Success`, {
            response,
            user: ctx.sub
        });
        return toDto(response);
    }

    @RequiresRole(UserRole.ADMIN)
    public async removeById(
        id: string,
        ctx: VerifiedTokenContext
    ): Promise<boolean> {
        AppLogger.info(`[IngredientsApi] Remove By Id`, { id, user: ctx.sub });
        const success = await this.ingredientsService.removeById(id);
        AppLogger.info(`[IngredientsApi] Remove By Id Success`, {
            success,
            user: ctx.sub
        });
        return success;
    }
}

export const IngredientsApiInstance = new IngredientsApi(
    IngredientsServiceInstance
);
