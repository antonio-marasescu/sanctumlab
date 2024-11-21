import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthUser } from '../types/auth.types';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        LoginSuccess: props<{ user: AuthUser }>(),
        LoginFailure: props<{ reason: string }>(),
        Logout: emptyProps()
    }
});
