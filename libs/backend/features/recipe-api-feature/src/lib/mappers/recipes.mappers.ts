import {
    CreateRecipeDto,
    RecipeCategory,
    RecipeDto,
    UpdateRecipeDto
} from '@sanctumlab/api-interfaces';
import { RecipeCategoryDomain, RecipeModel } from '@sanctumlab/be/data-access';

export function toDomain(dto: RecipeDto): Required<RecipeModel> {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        category: dto.category
            ? RecipeCategoryDomain[dto.category]
            : RecipeCategoryDomain.Unknown,
        ingredients: dto.ingredients
    } as Required<RecipeModel>;
}

export function toDomainCreate(dto: CreateRecipeDto): Required<RecipeModel> {
    return {
        id: crypto.randomUUID(),
        name: dto.name,
        description: dto.description,
        category: dto.category
            ? RecipeCategoryDomain[dto.category]
            : RecipeCategoryDomain.Unknown,
        ingredients: dto.ingredients
    } as Required<RecipeModel>;
}

export function toDomainUpdate(
    oldModel: RecipeModel,
    dto: UpdateRecipeDto
): Required<RecipeModel> {
    return {
        id: oldModel.id,
        name: dto.name,
        description: dto.description,
        category: dto.category
            ? RecipeCategoryDomain[dto.category]
            : RecipeCategoryDomain.Unknown,
        ingredients: dto.ingredients
    } as Required<RecipeModel>;
}

export function toDto(model: RecipeModel): RecipeDto {
    return {
        id: model.id,
        name: model.name,
        description: model.description,
        category: model.category
            ? RecipeCategory[model.category]
            : RecipeCategory.Unknown,
        ingredients: model.ingredients
    } as RecipeDto;
}

export function toModelList(dtoList: Array<RecipeDto>): Array<RecipeModel> {
    return dtoList?.map(toDomain) || [];
}

export function toDtoList(modelList: Array<RecipeModel>): Array<RecipeDto> {
    return modelList?.map(toDto) || [];
}
