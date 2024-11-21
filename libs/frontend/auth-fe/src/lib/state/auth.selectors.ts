import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AuthStateFeatureName } from './auth.reducers';
import { AuthUser } from '../types/auth.types';

export const selectAuthFeatureState = () =>
    createFeatureSelector<AuthState>(AuthStateFeatureName);

export const selectAuthStateCurrentUser = () =>
    createSelector(selectAuthFeatureState(), state => {
        return state.currentUserId
            ? (state.entities[state.currentUserId] as AuthUser)
            : null;
    });

export const selectAuthStateErrorReason = () =>
    createSelector(selectAuthFeatureState(), state => {
        return state.errorReason ?? null;
    });
