import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { MenuActions } from './menu.actions';

export const MenuStateFeatureName = 'menu';

export interface MenuState {
    selectedItem: ProductItemDto | null;
}

export const menuInitialState: MenuState = {
    selectedItem: null
};

export const menuStateReducer = createReducer(
    menuInitialState,
    on(MenuActions.selectItem, (state, { item }) => ({
        ...state,
        selectedItem: item
    })),
    on(MenuActions.deselectItem, state => ({
        ...state,
        selectedItem: null
    }))
);
