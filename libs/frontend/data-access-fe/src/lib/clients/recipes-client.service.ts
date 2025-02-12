import { inject, Injectable } from '@angular/core';
import { API_ENDPOINT_CONFIG } from '../config/api-settings.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    CreateIngredientDto,
    CreateRecipeDto,
    IngredientDto,
    RecipeDto,
    UpdateIngredientDto,
    UpdateRecipeDto
} from '@sanctumlab/api-interfaces';

@Injectable({ providedIn: 'root' })
export class RecipesClientService {
    private readonly apiEndpointConfiguration = inject(API_ENDPOINT_CONFIG);
    private readonly httpClient = inject(HttpClient);
    private readonly baseRoute: string = `${this.apiEndpointConfiguration.address}/recipes`;

    public retrieveRecipes(): Observable<RecipeDto[]> {
        return this.httpClient.get<RecipeDto[]>(`${this.baseRoute}`);
    }

    public retrieveRecipeById(id: string): Observable<RecipeDto> {
        return this.httpClient.get<RecipeDto>(`${this.baseRoute}/${id}`);
    }

    public createRecipe(payload: CreateRecipeDto): Observable<RecipeDto> {
        return this.httpClient.post<RecipeDto>(`${this.baseRoute}`, payload);
    }

    public updateRecipe(
        id: string,
        payload: UpdateRecipeDto
    ): Observable<RecipeDto> {
        return this.httpClient.put<RecipeDto>(
            `${this.baseRoute}/${id}`,
            payload
        );
    }

    public removeRecipeById(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseRoute}/${id}`);
    }

    public retrieveIngredients(): Observable<IngredientDto[]> {
        return this.httpClient.get<IngredientDto[]>(
            `${this.baseRoute}/ingredients`
        );
    }

    public retrieveIngredientById(id: string): Observable<IngredientDto> {
        return this.httpClient.get<IngredientDto>(
            `${this.baseRoute}/ingredients/${id}`
        );
    }

    public createIngredient(
        payload: CreateIngredientDto
    ): Observable<IngredientDto> {
        return this.httpClient.post<IngredientDto>(
            `${this.baseRoute}/ingredients`,
            payload
        );
    }

    public updateIngredient(
        id: string,
        payload: UpdateIngredientDto
    ): Observable<IngredientDto> {
        return this.httpClient.put<IngredientDto>(
            `${this.baseRoute}/ingredients/${id}`,
            payload
        );
    }

    public removeIngredientById(id: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.baseRoute}/ingredients/${id}`
        );
    }
}
