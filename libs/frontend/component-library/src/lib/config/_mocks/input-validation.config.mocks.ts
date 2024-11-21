import { provideInputValidationConfiguration } from '../input-validation.config';

export const provideMockInputValidationConfiguration = () =>
    provideInputValidationConfiguration({ getMessageByError: () => '' });
