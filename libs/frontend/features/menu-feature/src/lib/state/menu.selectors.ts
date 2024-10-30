import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState, MenuStateFeatureName } from './menu.reducers';

export const selectMenuFeatureState = () =>
    createFeatureSelector<MenuState>(MenuStateFeatureName);

export const selectMenuStateSelectedItem = () =>
    createSelector(selectMenuFeatureState(), state => {
        return state.selectedItem || null;
    });
