import {
    CreateIngredientDto,
    IngredientDto,
    UpdateIngredientDto
} from '@sanctumlab/api-interfaces';
import { IngredientModel } from '@sanctumlab/be/data-access';

export function toDomain(dto: IngredientDto): Required<IngredientModel> {
    return {
        id: dto.id,
        name: dto.name,
        icon: dto.icon,
        quantity: dto.quantity
    } as Required<IngredientModel>;
}

export function toDomainCreate(
    dto: CreateIngredientDto
): Required<IngredientModel> {
    return {
        id: crypto.randomUUID(),
        name: dto.name,
        icon: dto.icon,
        quantity: dto.quantity
    } as Required<IngredientModel>;
}

export function toDomainUpdate(
    oldModel: IngredientModel,
    dto: UpdateIngredientDto
): Required<IngredientModel> {
    return {
        id: oldModel.id,
        name: dto.name,
        icon: dto.icon,
        quantity: dto.quantity
    } as Required<IngredientModel>;
}

export function toDto(model: IngredientModel): IngredientDto {
    return {
        id: model.id,
        name: model.name,
        icon: model.icon,
        quantity: model.quantity
    } as IngredientDto;
}

export function toModelList(
    dtoList: Array<IngredientDto>
): Array<IngredientModel> {
    return dtoList?.map(toDomain) || [];
}

export function toDtoList(
    modelList: Array<IngredientModel>
): Array<IngredientDto> {
    return modelList?.map(toDto) || [];
}
