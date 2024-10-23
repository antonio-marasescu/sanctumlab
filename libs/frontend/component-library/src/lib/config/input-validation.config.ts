import {
    EnvironmentProviders,
    InjectionToken,
    makeEnvironmentProviders
} from '@angular/core';

export interface InputValidationConfiguration {
    errors: Record<string, (args: any) => string>;
}

export const InputValidationConfigToken =
    new InjectionToken<InputValidationConfiguration>(
        'InputValidationConfigToken'
    );

export const provideInputValidationConfiguration = (
    configuration: InputValidationConfiguration
): EnvironmentProviders =>
    makeEnvironmentProviders([
        {
            provide: InputValidationConfigToken,
            useValue: configuration
        }
    ]);
