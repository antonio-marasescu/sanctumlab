import {
    CreateProductItemDto,
    CreateProductItemDtoSchema,
    ProductItemDto,
    UpdateProductItemDto,
    UpdateProductItemDtoSchema
} from '@sanctumlab/api-interfaces';
import {
    ProductsService,
    ProductsServiceInstance
} from '../services/products.service';
import {
    toDomainCreate,
    toDomainUpdate,
    toDto,
    toDtoList
} from '../mappers/products.mappers';
import { AppLogger, hasRoleOrThrow } from '@sanctumlab/be/shared';
import { UserRole, VerifiedTokenContext } from '@sanctumlab/be/auth';

export class ProductsApi {
    constructor(private readonly productsService: ProductsService) {}

    public async retrieveAll(): Promise<ProductItemDto[]> {
        AppLogger.info(`[ProductsApi] Retrieve All `);
        const response = await this.productsService.retrieveAll();
        AppLogger.info(`[ProductsApi] Retrieve All Success`, {
            length: response.length
        });
        return toDtoList(response);
    }

    public async retrieveById(id: string): Promise<ProductItemDto> {
        AppLogger.info(`[ProductsApi] Retrieve By Id `, { id });
        const response = await this.productsService.retrieveById(id);
        AppLogger.info(`[ProductsApi] Retrieve By Id Success`, {
            retrievedId: response.id
        });
        return toDto(response);
    }

    public async create(
        dto: CreateProductItemDto,
        ctx: VerifiedTokenContext
    ): Promise<ProductItemDto> {
        hasRoleOrThrow(ctx, UserRole.ADMIN);
        AppLogger.info(`[ProductsApi] Create `, { dto });
        const validatedDto = CreateProductItemDtoSchema.parse(dto);
        const response = await this.productsService.create(
            toDomainCreate(validatedDto)
        );
        AppLogger.info(`[ProductsApi] Create Success`, { response });
        return toDto(response);
    }

    public async update(
        id: string,
        dto: UpdateProductItemDto,
        ctx: VerifiedTokenContext
    ): Promise<ProductItemDto> {
        hasRoleOrThrow(ctx, UserRole.ADMIN);
        AppLogger.info(`[ProductsApi] Update `, { id, dto });
        const validatedDto = UpdateProductItemDtoSchema.parse(dto);
        const oldModel = await this.productsService.retrieveById(id);

        const response = await this.productsService.update(
            id,
            toDomainUpdate(oldModel, validatedDto)
        );
        AppLogger.info(`[ProductsApi] Update Success`, { response });
        return toDto(response);
    }

    public async removeById(
        id: string,
        ctx: VerifiedTokenContext
    ): Promise<boolean> {
        hasRoleOrThrow(ctx, UserRole.ADMIN);
        AppLogger.info(`[ProductsApi] Remove By Id`, { id });
        const success = await this.productsService.removeById(id);
        AppLogger.info(`[ProductsApi] Remove By Id Success`, { success });
        return success;
    }
}

export const ProductsApiInstance = new ProductsApi(ProductsServiceInstance);
