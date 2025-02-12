import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    CreateIngredientDto,
    IngredientDto,
    UpdateIngredientDto
} from '@sanctumlab/api-interfaces';

export const IngredientsActions = createActionGroup({
    source: 'Ingredients',
    events: {
        CreateIngredient: props<{ ingredient: CreateIngredientDto }>(),
        CreateIngredientSuccess: props<{ ingredient: IngredientDto }>(),
        UpdateIngredient: props<{
            ingredient: UpdateIngredientDto;
            id: string;
        }>(),
        UpdateIngredientSuccess: props<{ ingredient: IngredientDto }>(),
        RemoveIngredient: props<{ id: string }>(),
        RemoveIngredientSuccess: props<{ id: string }>(),
        GetIngredientList: emptyProps(),
        GetIngredientListSuccess: props<{ ingredients: IngredientDto[] }>(),
        GetIngredientById: props<{ id: string }>(),
        GetIngredientByIdSuccess: props<{ ingredient: IngredientDto }>(),
        IngredientFailure: props<{ reason: string }>(),
        SetCurrentIngredient: props<{ id: string }>(),
        UnsetCurrentIngredient: emptyProps()
    }
});
