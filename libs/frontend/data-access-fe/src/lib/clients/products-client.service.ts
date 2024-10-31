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

    public retrieveProductById(id: string): Observable<ProductItemDto> {
        return of({
            id: '3',
            name: 'Whiskey Sour',
            description:
                'A sour and sweet cocktail made with whiskey, lemon juice, and simple syrup.',
            category: ProductItemCategory.Cocktail,
            recipe: `
- **Ingredients**: Whiskey, fresh lemon juice, simple syrup, ice.
- **Instructions**:
  1. Add whiskey, lemon juice, and simple syrup to a cocktail shaker with ice.
  2. Shake well until chilled.
  3. Strain into a glass and garnish with a lemon twist or cherry.
        `,
            tags: ['sour', 'citrus', 'classic'],
            available: false
        });
    }

    public retrieveProducts(): Observable<ProductItemDto[]> {
        return of([
            {
                id: '1',
                name: 'Mojito',
                description:
                    'A refreshing cocktail made with mint, lime, and rum.',
                category: ProductItemCategory.Cocktail,
                recipe: `
- **Ingredients**: Fresh mint leaves, lime wedges, white rum, soda water, ice.
- **Instructions**:
  1. Muddle mint leaves and lime wedges in a glass to release the flavors.
  2. Add white rum and fill the glass with soda water.
  3. Stir gently, add ice, and garnish with a mint sprig.
        `,
                tags: ['refreshing', 'minty', 'classic'],
                available: true
            },
            {
                id: '2',
                name: 'Pina Colada',
                description:
                    'A tropical blend of pineapple, coconut cream, and rum.',
                category: ProductItemCategory.Cocktail,
                recipe: `
- **Ingredients**: Pineapple juice, coconut cream, white rum, ice.
- **Instructions**:
  1. Combine pineapple juice, coconut cream, and rum in a blender.
  2. Add ice and blend until smooth and creamy.
  3. Pour into a chilled glass and garnish with a pineapple slice or cherry.
        `,
                tags: ['tropical', 'creamy', 'sweet'],
                available: true
            },
            {
                id: '3',
                name: 'Whiskey Sour',
                description:
                    'A sour and sweet cocktail made with whiskey, lemon juice, and simple syrup.',
                category: ProductItemCategory.Cocktail,
                recipe: `
- **Ingredients**: Whiskey, fresh lemon juice, simple syrup, ice.
- **Instructions**:
  1. Add whiskey, lemon juice, and simple syrup to a cocktail shaker with ice.
  2. Shake well until chilled.
  3. Strain into a glass and garnish with a lemon twist or cherry.
        `,
                tags: ['sour', 'citrus', 'classic'],
                available: false
            },
            {
                id: '4',
                name: 'Margarita',
                description:
                    'A zesty and tangy cocktail made with tequila, lime, and orange liqueur.',
                category: ProductItemCategory.Cocktail,
                recipe: `
- **Ingredients**: Tequila, fresh lime juice, orange liqueur, salt, ice.
- **Instructions**:
  1. Rim a glass with salt (optional).
  2. In a shaker, combine tequila, lime juice, and orange liqueur with ice.
  3. Shake vigorously, then strain into the prepared glass.
  4. Garnish with a lime wedge.
        `,
                tags: ['tangy', 'zesty', 'classic'],
                available: true
            },
            {
                id: '5',
                name: 'Chips & Salsa',
                description:
                    'Crispy tortilla chips served with fresh tomato salsa.',
                category: ProductItemCategory.Snacks,
                recipe: `
- **Ingredients**: Tortilla chips, fresh tomato salsa.
- **Instructions**:
  1. Arrange tortilla chips on a serving plate.
  2. Place a bowl of freshly made tomato salsa on the side.
  3. Serve as a snack or appetizer.
        `,
                tags: ['snack', 'crispy', 'spicy'],
                available: true
            },
            {
                id: '6',
                name: 'Guacamole & Chips',
                description:
                    'Creamy avocado guacamole with a side of crispy tortilla chips.',
                category: ProductItemCategory.Snacks,
                recipe: `
- **Ingredients**: Ripe avocados, lime juice, salt, chopped cilantro, tortilla chips.
- **Instructions**:
  1. Mash the avocados with lime juice and salt until smooth.
  2. Stir in chopped cilantro for added flavor.
  3. Serve with tortilla chips on the side.
        `,
                tags: ['creamy', 'avocado', 'snack'],
                available: true
            },
            {
                id: '7',
                name: 'Buffalo Wings',
                description:
                    'Spicy chicken wings tossed in tangy buffalo sauce.',
                category: ProductItemCategory.Snacks,
                recipe: `
- **Ingredients**: Chicken wings, buffalo sauce, blue cheese dressing (optional).
- **Instructions**:
  1. Fry or bake chicken wings until crispy and cooked through.
  2. Toss the wings with buffalo sauce until fully coated.
  3. Serve hot, with a side of blue cheese dressing if desired.
        `,
                tags: ['spicy', 'tangy', 'chicken'],
                available: false
            }
        ]);
    }
}
