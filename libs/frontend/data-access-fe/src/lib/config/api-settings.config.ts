import {
    EnvironmentProviders,
    InjectionToken,
    makeEnvironmentProviders
} from '@angular/core';

export interface ApiEndpointConfiguration {
    address: string;
}

export const API_ENDPOINT_CONFIG = new InjectionToken<ApiEndpointConfiguration>(
    'API_ENDPOINT_CONFIG'
);

export const provideApiEndpointConfiguration = (
    configuration: ApiEndpointConfiguration
): EnvironmentProviders =>
    makeEnvironmentProviders([
        {
            provide: API_ENDPOINT_CONFIG,
            useValue: configuration
        }
    ]);
