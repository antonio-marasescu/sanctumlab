import {
    CreateProductItemDto,
    CreateProductItemDtoSchema,
    ProductItemDto,
    UpdateProductItemDto,
    UpdateProductItemDtoSchema
} from '@sanctumlab/api-interfaces';
import { ProductsServiceInstance } from '../services/products.service';
import {
    toDomainCreate,
    toDomainUpdate,
    toDto,
    toDtoList
} from '../mappers/products.mappers';
import { AppLogger } from '@sanctumlab/be/shared';

export class ProductsApi {
    public async retrieveAll(): Promise<ProductItemDto[]> {
        AppLogger.info(`[ProductsApi] Retrieve All `);
        const response = await ProductsServiceInstance.retrieveAll();
        AppLogger.info(`[ProductsApi] Retrieve All Success`, {
            length: response.length
        });
        return toDtoList(response);
    }

    public async retrieveById(id: string): Promise<ProductItemDto> {
        AppLogger.info(`[ProductsApi] Retrieve By Id `, { id });
        const response = await ProductsServiceInstance.retrieveById(id);
        AppLogger.info(`[ProductsApi] Retrieve By Id Success`, {
            retrievedId: response.id
        });
        return toDto(response);
    }

    public async create(dto: CreateProductItemDto): Promise<ProductItemDto> {
        AppLogger.info(`[ProductsApi] Create `, { dto });
        const validatedDto = CreateProductItemDtoSchema.parse(dto);
        const response = await ProductsServiceInstance.create(
            toDomainCreate(validatedDto)
        );
        AppLogger.info(`[ProductsApi] Create Success`, { response });
        return toDto(response);
    }

    public async update(
        id: string,
        dto: UpdateProductItemDto
    ): Promise<ProductItemDto> {
        AppLogger.info(`[ProductsApi] Update `, { id, dto });
        const validatedDto = UpdateProductItemDtoSchema.parse(dto);
        const oldModel = await ProductsServiceInstance.retrieveById(id);

        const response = await ProductsServiceInstance.update(
            id,
            toDomainUpdate(oldModel, validatedDto)
        );
        AppLogger.info(`[ProductsApi] Update Success`, { response });
        return toDto(response);
    }

    public async removeById(id: string): Promise<boolean> {
        AppLogger.info(`[ProductsApi] Remove By Id`, { id });
        const success = await ProductsServiceInstance.removeById(id);
        AppLogger.info(`[ProductsApi] Remove By Id Success`, { success });
        return success;
    }
}

export const ProductsApiInstance = new ProductsApi();
