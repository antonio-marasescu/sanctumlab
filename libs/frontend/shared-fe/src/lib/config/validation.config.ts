import { InputValidationConfiguration } from '@sanctumlab/fe/component-library';
import i18next from 'i18next';

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
        return i18next.t(validations[key], { ...args });
    }
});
