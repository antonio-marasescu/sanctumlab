import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minArrayLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (Array.isArray(value) && value.length >= minLength) {
            return null;
        }

        return {
            minArrayLength: {
                requiredLength: minLength,
                actualLength: value ? value.length : 0
            }
        };
    };
}

export function maxArrayLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (Array.isArray(value) && value.length <= maxLength) {
            return null;
        }

        return {
            maxArrayLength: {
                requiredLength: maxLength,
                actualLength: value ? value.length : 0
            }
        };
    };
}
