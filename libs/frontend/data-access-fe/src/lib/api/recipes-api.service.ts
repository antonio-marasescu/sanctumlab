import { inject, Injectable } from '@angular/core';
import {
    CreateRecipeDto,
    RecipeDto,
    UpdateRecipeDto
} from '@sanctumlab/api-interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RecipesSelectors } from '../state/recipes/recipes.selectors';
import { RecipesActions } from '../state/recipes/recipes.actions';

@Injectable({ providedIn: 'root' })
export class RecipesApiService {
    private readonly store = inject(Store);

    public retrieveRecipesStream(): Observable<RecipeDto[]> {
        return this.store.select(RecipesSelectors.selectRecipes());
    }

    public retrieveRecipesIsLoadingStream(): Observable<boolean> {
        return this.store.select(RecipesSelectors.selectRecipesStateLoading());
    }

    public retrieveRecipeByIdStream(id: string): Observable<RecipeDto> {
        return this.store.select(RecipesSelectors.selectRecipeById(id));
    }

    public retrieveCurrentRecipeStream(): Observable<RecipeDto | null> {
        return this.store.select(RecipesSelectors.selectCurrentRecipe());
    }

    public sendRetrieveRecipeList(): void {
        this.store.dispatch(RecipesActions.getRecipeList());
    }

    public sendRetrieveRecipeById(id: string): void {
        this.store.dispatch(RecipesActions.getRecipeById({ id }));
    }

    public sendCreateRecipe(payload: CreateRecipeDto): void {
        this.store.dispatch(RecipesActions.createRecipe({ recipe: payload }));
    }

    public sendUpdateRecipe(id: string, payload: UpdateRecipeDto): void {
        this.store.dispatch(
            RecipesActions.updateRecipe({ id, recipe: payload })
        );
    }

    public sendRemoveRecipe(id: string): void {
        this.store.dispatch(RecipesActions.removeRecipe({ id }));
    }

    public sendSetCurrentRecipe(id: string): void {
        this.store.dispatch(RecipesActions.setCurrentRecipe({ id }));
    }

    public sendUnsetCurrentRecipe(): void {
        this.store.dispatch(RecipesActions.unsetCurrentRecipe());
    }
}
