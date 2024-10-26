import { Injectable } from '@angular/core';
import {
    CreateProductItemDto,
    ProductItemCategory,
    ProductItemDto,
    UpdateProductItemDto
} from '@sanctumlab/api-interfaces';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductsClientService {
    constructor(private httpClient: HttpClient) {}

    public createProduct(
        payload: CreateProductItemDto
    ): Observable<ProductItemDto> {
        return of({
            id: crypto.randomUUID(),
            ...payload,
            available: true
        });
    }

    public updateProduct(
        id: string,
        payload: UpdateProductItemDto
    ): Observable<ProductItemDto> {
        return of({
            id,
            ...payload,
            available: true
        });
    }

    public removeProduct(id: string): Observable<void> {
        return of();
    }

    public retrieveProducts(): Observable<ProductItemDto[]> {
        return of([
            {
                id: '1',
                name: 'Mojito',
                description:
                    'A refreshing cocktail made with mint, lime, and rum.',
                category: ProductItemCategory.Cocktail,
                recipe: 'Muddle mint leaves and lime, add rum and soda water, serve over ice.',
                tags: ['refreshing', 'minty', 'classic'],
                available: true
            },
            {
                id: '2',
                name: 'Pina Colada',
                description:
                    'A tropical blend of pineapple, coconut cream, and rum.',
                category: ProductItemCategory.Cocktail,
                recipe: 'Blend pineapple juice, coconut cream, and rum with ice until smooth.',
                tags: ['tropical', 'creamy', 'sweet'],
                available: true
            },
            {
                id: '3',
                name: 'Whiskey Sour',
                description:
                    'A sour and sweet cocktail made with whiskey, lemon juice, and simple syrup.',
                category: ProductItemCategory.Cocktail,
                recipe: 'Shake whiskey, lemon juice, and simple syrup with ice, then strain.',
                tags: ['sour', 'citrus', 'classic'],
                available: false
            },
            {
                id: '4',
                name: 'Margarita',
                description:
                    'A zesty and tangy cocktail made with tequila, lime, and orange liqueur.',
                category: ProductItemCategory.Cocktail,
                recipe: 'Shake tequila, lime juice, and orange liqueur with ice, strain into a salt-rimmed glass.',
                tags: ['tangy', 'zesty', 'classic'],
                available: true
            },
            {
                id: '5',
                name: 'Chips & Salsa',
                description:
                    'Crispy tortilla chips served with fresh tomato salsa.',
                category: ProductItemCategory.Snacks,
                recipe: 'Serve tortilla chips with a bowl of freshly made tomato salsa.',
                tags: ['snack', 'crispy', 'spicy'],
                available: true
            },
            {
                id: '6',
                name: 'Guacamole & Chips',
                description:
                    'Creamy avocado guacamole with a side of crispy tortilla chips.',
                category: ProductItemCategory.Snacks,
                recipe: 'Mash avocados with lime, salt, and cilantro, serve with tortilla chips.',
                tags: ['creamy', 'avocado', 'snack'],
                available: true
            },
            {
                id: '7',
                name: 'Buffalo Wings',
                description:
                    'Spicy chicken wings tossed in tangy buffalo sauce.',
                category: ProductItemCategory.Snacks,
                recipe: 'Fry chicken wings, toss with buffalo sauce, and serve with blue cheese dressing.',
                tags: ['spicy', 'tangy', 'chicken'],
                available: false
            }
        ]);
    }
}
