import { InputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { inject } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';

export const standardValidations: Record<string, string> = {
    required: 'shared:validations.required',
    minlength: `shared:validations.minlength`,
    email: `shared:validations.email`
};

export const validationConfigFactory = (
    validations: Record<string, string> = standardValidations
): InputValidationConfiguration => ({
    getMessageByError: (
        key: string,
        args: Record<string, string>
    ): string | undefined => {
        const i18NextPipe = inject(I18NextPipe);
        return i18NextPipe.transform(validations[key], { ...args });
    }
});
