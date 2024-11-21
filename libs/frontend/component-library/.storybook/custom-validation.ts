import { InputValidationConfiguration } from '../src/lib/config/input-validation.config';

export const validationConfigFactory = (): InputValidationConfiguration => ({
    getMessageByError: (key: string): string | undefined => {
        return key;
    }
});
