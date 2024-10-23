import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthUser } from '../types/auth.types';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const AuthStateFeatureName = 'auth';

export interface AuthState extends EntityState<AuthUser> {
    currentUserId: string | null;
    errorReason: string | null;
}

export const authStateAdapter: EntityAdapter<AuthUser> =
    createEntityAdapter<AuthUser>({
        selectId: user => user.id
    });

export const authInitialState: AuthState = authStateAdapter.getInitialState({
    currentUserId: null,
    errorReason: null
});

export const authStateReducer = createReducer(
    authInitialState,
    on(AuthActions.loginSuccess, (state, { user }) => {
        return authStateAdapter.setOne(user, {
            ...state,
            currentUserId: user.id,
            errorReason: null
        });
    }),
    on(AuthActions.loginFailure, (state, { reason }) => {
        return authStateAdapter.removeAll({
            ...state,
            currentUserId: null,
            errorReason: reason
        });
    }),
    on(AuthActions.logout, state => {
        return authStateAdapter.removeAll({
            ...state,
            currentUserId: null,
            errorReason: null
        });
    })
);
