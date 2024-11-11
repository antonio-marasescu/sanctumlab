import {
    EnvironmentProviders,
    InjectionToken,
    makeEnvironmentProviders
} from '@angular/core';

export type InputValidationConfiguration = {
    getMessageByError: (
        key: string,
        args: Record<string, string>
    ) => string | undefined;
};

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
