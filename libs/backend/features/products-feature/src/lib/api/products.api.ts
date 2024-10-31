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

export class ProductsApi {
    public async retrieveAll(): Promise<ProductItemDto[]> {
        const response = await ProductsServiceInstance.retrieveAll();
        return toDtoList(response);
    }

    public async retrieveById(id: string): Promise<ProductItemDto> {
        const response = await ProductsServiceInstance.retrieveById(id);
        return toDto(response);
    }

    public async create(dto: CreateProductItemDto): Promise<ProductItemDto> {
        const validatedDto = CreateProductItemDtoSchema.parse(dto);
        const response = await ProductsServiceInstance.create(
            toDomainCreate(validatedDto)
        );
        return toDto(response);
    }

    public async update(
        id: string,
        dto: UpdateProductItemDto
    ): Promise<ProductItemDto> {
        const validatedDto = UpdateProductItemDtoSchema.parse(dto);
        const oldModel = await ProductsServiceInstance.retrieveById(id);

        const response = await ProductsServiceInstance.update(
            id,
            toDomainUpdate(oldModel, validatedDto)
        );
        return toDto(response);
    }

    public async removeById(id: string): Promise<boolean> {
        return ProductsServiceInstance.removeById(id);
    }
}

export const ProductsApiInstance = new ProductsApi();
