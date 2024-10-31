import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { AuthStateFeatureName, authStateReducer } from '../state/auth.reducers';

export const provideAuthState = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideState(AuthStateFeatureName, authStateReducer)
    ]);
