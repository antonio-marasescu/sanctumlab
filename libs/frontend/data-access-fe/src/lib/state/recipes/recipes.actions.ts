import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    CreateRecipeDto,
    RecipeDto,
    UpdateRecipeDto
} from '@sanctumlab/api-interfaces';

export const RecipesActions = createActionGroup({
    source: 'Recipes',
    events: {
        CreateRecipe: props<{ recipe: CreateRecipeDto }>(),
        CreateRecipeSuccess: props<{ recipe: RecipeDto }>(),
        UpdateRecipe: props<{ recipe: UpdateRecipeDto; id: string }>(),
        UpdateRecipeSuccess: props<{ recipe: RecipeDto }>(),
        RemoveRecipe: props<{ id: string }>(),
        RemoveRecipeSuccess: props<{ id: string }>(),
        GetRecipeList: emptyProps(),
        GetRecipeListSuccess: props<{ recipes: RecipeDto[] }>(),
        GetRecipeById: props<{ id: string }>(),
        GetRecipeByIdSuccess: props<{ recipe: RecipeDto }>(),
        RecipeFailure: props<{ reason: string }>(),
        SetCurrentRecipe: props<{ id: string }>(),
        UnsetCurrentRecipe: emptyProps()
    }
});
