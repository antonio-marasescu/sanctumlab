import { authInitialState, AuthState, authStateReducer } from './auth.reducers';
import { AuthActions } from './auth.actions';
import { createMockAuthUser } from '../types/_mocks/auth.types.mocks';

describe('AuthReducer', () => {
    it('should return the default state for unknown action', () => {
        const initialState = authInitialState;
        const action = {
            type: 'Unknown'
        };
        const state = authStateReducer(initialState, action);

        expect(state).toBe(initialState);
    });

    it('should add user info on login success in an immutable way', () => {
        const payload = createMockAuthUser();
        const action = AuthActions.loginSuccess({
            user: payload
        });
        const expectedState: AuthState = {
            ...authInitialState,
            entities: { [payload.id]: payload },
            ids: [payload.id],
            currentUserId: payload.id,
            errorReason: null
        };
        const state = authStateReducer(authInitialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(authInitialState);
    });

    it('should add error reason and clear state on login failure in an immutable way', () => {
        const initialStatePayload = createMockAuthUser();
        const payload = 'Error Reason';
        const action = AuthActions.loginFailure({
            reason: payload
        });
        const initialState: AuthState = {
            ...authInitialState,
            entities: { [initialStatePayload.id]: initialStatePayload },
            ids: [initialStatePayload.id],
            currentUserId: initialStatePayload.id,
            errorReason: null
        };
        const expectedState: AuthState = {
            ...authInitialState,
            errorReason: payload
        };

        const state = authStateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(initialState);
    });

    it('should clear state on logout in an immutable way', () => {
        const initialStatePayload = createMockAuthUser();
        const action = AuthActions.logout();

        const initialState: AuthState = {
            ...authInitialState,
            entities: { [initialStatePayload.id]: initialStatePayload },
            ids: [initialStatePayload.id],
            currentUserId: initialStatePayload.id,
            errorReason: null
        };
        const expectedState: AuthState = {
            ...authInitialState
        };

        const state = authStateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(initialState);
    });
});
