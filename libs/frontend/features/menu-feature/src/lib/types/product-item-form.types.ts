import { FormControl } from '@angular/forms';

export type ProductItemForm = {
    name: FormControl<string>;
    description: FormControl<string>;
    category: FormControl<string>;
    recipe: FormControl<string>;
    tags: FormControl<string[]>;
    available: FormControl<boolean>;
};

export type ProductItemFormValue = {
    name: string;
    description: string;
    category: string;
    recipe: string;
    tags: string[];
    available: boolean;
};

export type ProductFormSubmitEvent = {
    form: ProductItemFormValue;
    id: string | undefined;
};
