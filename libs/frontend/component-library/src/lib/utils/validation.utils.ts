import { InputValidationConfiguration } from '../config/input-validation.config';
import { FormControl } from '@angular/forms';

export function retrieveErrorMessage(
    validationConfiguration: InputValidationConfiguration,
    control: FormControl
): string {
    if (!control.errors) {
        return '';
    }
    const firstErrorKey = Object.keys(control.errors)[0];

    const errorMessageFn = validationConfiguration.errors[firstErrorKey];
    if (!errorMessageFn) {
        return firstErrorKey;
    }

    return errorMessageFn(control.errors[firstErrorKey]);
}
