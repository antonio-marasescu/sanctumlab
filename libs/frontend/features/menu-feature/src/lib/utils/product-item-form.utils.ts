import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductItemForm } from '../types/product-item-form.types';

export function createProductItemForm(
    initialValues?: ProductItemDto | null
): FormGroup<ProductItemForm> {
    return new FormGroup<ProductItemForm>({
        name: new FormControl<string>(initialValues?.name ?? '', {
            nonNullable: true,
            validators: []
        }),
        description: new FormControl<string>(initialValues?.description ?? '', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        category: new FormControl<string>(initialValues?.category ?? '', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        recipe: new FormControl<string>(initialValues?.recipe ?? '', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        tags: new FormControl<string[]>(initialValues?.tags ?? [], {
            nonNullable: true,
            validators: [Validators.required]
        }),
        available: new FormControl<boolean>(initialValues?.available ?? false, {
            nonNullable: true,
            validators: [Validators.required]
        })
    });
}
