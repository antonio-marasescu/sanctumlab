import { FormControl } from '@angular/forms';

export interface ProductItemForm {
    name: FormControl<string>;
    description: FormControl<string>;
    category: FormControl<string>;
    recipe: FormControl<string>;
    tags: FormControl<string[]>;
    available: FormControl<boolean>;
}
