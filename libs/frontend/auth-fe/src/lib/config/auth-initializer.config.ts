import { AuthenticationService } from '../services/authentication.service';
import {
    EnvironmentProviders,
    makeEnvironmentProviders,
    inject,
    provideAppInitializer
} from '@angular/core';

export function authInitializerFactory(
    amplifyAuthService: AuthenticationService
): () => Promise<void> {
    return () => amplifyAuthService.init();
}

export function provideAuthentication(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideAppInitializer(() => {
            const initializerFn = authInitializerFactory(
                inject(AuthenticationService)
            );
            return initializerFn();
        })
    ]);
}
