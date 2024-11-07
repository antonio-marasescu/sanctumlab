import { AuthenticationService } from '../services/authentication.service';
import {
    APP_INITIALIZER,
    EnvironmentProviders,
    makeEnvironmentProviders
} from '@angular/core';

export function authInitializerFactory(
    amplifyAuthService: AuthenticationService
): () => Promise<void> {
    return () => amplifyAuthService.init();
}

export function provideAuthentication(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: APP_INITIALIZER,
            useFactory: authInitializerFactory,
            deps: [AuthenticationService],
            multi: true
        }
    ]);
}
