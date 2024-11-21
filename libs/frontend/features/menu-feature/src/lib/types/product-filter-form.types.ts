import { FormControl } from '@angular/forms';

export type ProductFilterForm = {
    showUnavailable: FormControl<boolean>;
    search: FormControl<string>;
};

export type ProductFilterFormValue = {
    showUnavailable: boolean;
    search: string;
};

export const ProductFilterFormInitialValue: ProductFilterFormValue = {
    showUnavailable: false,
    search: ''
};
