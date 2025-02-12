import { inject, Injectable } from '@angular/core';
import {
    CreateIngredientDto,
    IngredientDto,
    UpdateIngredientDto
} from '@sanctumlab/api-interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IngredientsSelectors } from '../state/ingredients/ingredients.selectors';
import { IngredientsActions } from '../state/ingredients/ingredients.actions';

@Injectable({ providedIn: 'root' })
export class IngredientsApiService {
    private readonly store = inject(Store);

    public retrieveIngredientsStream(): Observable<IngredientDto[]> {
        return this.store.select(IngredientsSelectors.selectIngredients());
    }

    public retrieveIngredientsIsLoadingStream(): Observable<boolean> {
        return this.store.select(
            IngredientsSelectors.selectIngredientsStateLoading()
        );
    }

    public retrieveIngredientByIdStream(id: string): Observable<IngredientDto> {
        return this.store.select(IngredientsSelectors.selectIngredientById(id));
    }

    public retrieveCurrentIngredientStream(): Observable<IngredientDto | null> {
        return this.store.select(
            IngredientsSelectors.selectCurrentIngredient()
        );
    }

    public sendRetrieveIngredientList(): void {
        this.store.dispatch(IngredientsActions.getIngredientList());
    }

    public sendRetrieveIngredientById(id: string): void {
        this.store.dispatch(IngredientsActions.getIngredientById({ id }));
    }

    public sendCreateIngredient(payload: CreateIngredientDto): void {
        this.store.dispatch(
            IngredientsActions.createIngredient({ ingredient: payload })
        );
    }

    public sendUpdateIngredient(
        id: string,
        payload: UpdateIngredientDto
    ): void {
        this.store.dispatch(
            IngredientsActions.updateIngredient({ id, ingredient: payload })
        );
    }

    public sendRemoveIngredient(id: string): void {
        this.store.dispatch(IngredientsActions.removeIngredient({ id }));
    }

    public sendSetCurrentIngredient(id: string): void {
        this.store.dispatch(IngredientsActions.setCurrentIngredient({ id }));
    }

    public sendUnsetCurrentIngredient(): void {
        this.store.dispatch(IngredientsActions.unsetCurrentIngredient());
    }
}
