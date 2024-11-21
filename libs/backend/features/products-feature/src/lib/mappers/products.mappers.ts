import {
    CreateProductItemDto,
    ProductItemCategory,
    ProductItemDto,
    UpdateProductItemDto
} from '@sanctumlab/api-interfaces';
import {
    ProductItemCategoryDomain,
    ProductModel
} from '@sanctumlab/be/data-access';

export function toDomain(dto: ProductItemDto): Required<ProductModel> {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        recipe: dto.recipe,
        category: ProductItemCategoryDomain[dto.category],
        tags: dto.tags,
        available: dto.available
    } as Required<ProductModel>;
}

export function toDomainCreate(
    dto: CreateProductItemDto
): Required<ProductModel> {
    return {
        id: crypto.randomUUID(),
        name: dto.name,
        description: dto.description,
        recipe: dto.recipe,
        category: ProductItemCategoryDomain[dto.category],
        tags: dto.tags,
        available: dto.available
    } as Required<ProductModel>;
}

export function toDomainUpdate(
    oldModel: ProductModel,
    dto: UpdateProductItemDto
): Required<ProductModel> {
    return {
        id: oldModel.id,
        name: dto.name,
        description: dto.description,
        recipe: dto.recipe,
        category: ProductItemCategoryDomain[dto.category],
        tags: dto.tags,
        available: dto.available
    } as Required<ProductModel>;
}

export function toDto(model: ProductModel): ProductItemDto {
    return {
        id: model.id,
        name: model.name,
        description: model.description,
        recipe: model.recipe,
        category: model.category
            ? ProductItemCategory[model.category]
            : ProductItemCategory.Unknown,
        tags: model.tags,
        available: model.available
    } as ProductItemDto;
}

export function toModelList(
    dtoList: Array<ProductItemDto>
): Array<ProductModel> {
    return dtoList?.map(toDomain) || [];
}

export function toDtoList(
    modelList: Array<ProductModel>
): Array<ProductItemDto> {
    return modelList?.map(toDto) || [];
}
