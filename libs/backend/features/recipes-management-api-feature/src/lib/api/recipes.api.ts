import {
    CreateRecipeDto,
    CreateRecipeDtoSchema,
    RecipeDto,
    UpdateRecipeDto,
    UpdateRecipeDtoSchema
} from '@sanctumlab/api-interfaces';
import {
    RecipesService,
    RecipesServiceInstance
} from '../services/recipes.service';
import {
    toDomainCreate,
    toDomainUpdate,
    toDto,
    toDtoList
} from '../mappers/recipes.mappers';
import { AppLogger, RequiresRole } from '@sanctumlab/be/shared';
import { UserRole, VerifiedTokenContext } from '@sanctumlab/be/auth';

export class RecipesApi {
    constructor(private readonly recipesService: RecipesService) {}

    @RequiresRole(UserRole.ADMIN)
    public async retrieveAll(ctx: VerifiedTokenContext): Promise<RecipeDto[]> {
        AppLogger.info(`[RecipesApi] Retrieve All `, { user: ctx.sub });
        const response = await this.recipesService.retrieveAll();
        AppLogger.info(`[RecipesApi] Retrieve All Success`, {
            length: response.length,
            user: ctx.sub
        });
        return toDtoList(response);
    }

    @RequiresRole(UserRole.ADMIN)
    public async retrieveById(
        id: string,
        ctx: VerifiedTokenContext
    ): Promise<RecipeDto> {
        AppLogger.info(`[RecipesApi] Retrieve By Id `, { id, user: ctx.sub });
        const response = await this.recipesService.retrieveById(id);
        AppLogger.info(`[RecipesApi] Retrieve By Id Success`, {
            retrievedId: response.id,
            user: ctx.sub
        });
        return toDto(response);
    }

    @RequiresRole(UserRole.ADMIN)
    public async create(
        dto: CreateRecipeDto,
        ctx: VerifiedTokenContext
    ): Promise<RecipeDto> {
        AppLogger.info(`[RecipesApi] Create `, { dto, user: ctx.sub });
        const validatedDto = CreateRecipeDtoSchema.parse(dto);
        const response = await this.recipesService.create(
            toDomainCreate(validatedDto)
        );
        AppLogger.info(`[RecipesApi] Create Success`, {
            response,
            user: ctx.sub
        });
        return toDto(response);
    }

    @RequiresRole(UserRole.ADMIN)
    public async update(
        id: string,
        dto: UpdateRecipeDto,
        ctx: VerifiedTokenContext
    ): Promise<RecipeDto> {
        AppLogger.info(`[RecipesApi] Update `, { id, dto, user: ctx.sub });
        const validatedDto = UpdateRecipeDtoSchema.parse(dto);
        const oldModel = await this.recipesService.retrieveById(id);

        const response = await this.recipesService.update(
            id,
            toDomainUpdate(oldModel, validatedDto)
        );
        AppLogger.info(`[RecipesApi] Update Success`, {
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
        AppLogger.info(`[RecipesApi] Remove By Id`, { id, user: ctx.sub });
        const success = await this.recipesService.removeById(id);
        AppLogger.info(`[RecipesApi] Remove By Id Success`, {
            success,
            user: ctx.sub
        });
        return success;
    }
}

export const RecipesApiInstance = new RecipesApi(RecipesServiceInstance);
