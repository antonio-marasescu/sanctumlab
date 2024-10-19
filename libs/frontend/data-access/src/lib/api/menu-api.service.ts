import { Injectable } from '@angular/core';
import { MenuItem, MenuItemType } from '@sanctumlab/api-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuApiService {
    private hardcodedMenu: MenuItem[] = [
        {
            id: '1234',
            name: 'Pina Colada',
            description:
                'A drink with a large amount of coconut, combined with pineapple juice and rum.',
            type: MenuItemType.Cocktail
        },
        {
            id: '5678',
            name: 'Margarita',
            description:
                'A refreshing cocktail with tequila, lime juice, and orange liqueur, served with salt on the rim.',
            type: MenuItemType.Cocktail
        },
        {
            id: '9101',
            name: 'Mojito',
            description:
                'A Cuban cocktail made with white rum, sugar, lime juice, soda water, and mint.',
            type: MenuItemType.Cocktail
        },
        {
            id: '1121',
            name: 'Old Fashioned',
            description:
                'A classic cocktail made with bourbon or rye whiskey, bitters, sugar, and a twist of citrus.',
            type: MenuItemType.Cocktail
        },
        {
            id: '3141',
            name: 'Cosmopolitan',
            description:
                'A sophisticated cocktail with vodka, triple sec, cranberry juice, and lime juice.',
            type: MenuItemType.Cocktail
        },
        {
            id: '5161',
            name: 'Daiquiri',
            description:
                'A light and refreshing cocktail made with rum, lime juice, and simple syrup.',
            type: MenuItemType.Cocktail
        },
        {
            id: '7181',
            name: 'Mai Tai',
            description:
                'A tropical cocktail with rum, lime juice, orgeat syrup, and orange liqueur.',
            type: MenuItemType.Cocktail
        },
        {
            id: '9202',
            name: 'Bloody Mary',
            description:
                'A savory cocktail made with vodka, tomato juice, spices, and garnishes like celery and olives.',
            type: MenuItemType.Cocktail
        }
    ];

    public retrieveMenuStream(
        filterType: MenuItemType
    ): Observable<MenuItem[]> {
        return of(this.hardcodedMenu.filter(item => item.type === filterType));
    }
}
