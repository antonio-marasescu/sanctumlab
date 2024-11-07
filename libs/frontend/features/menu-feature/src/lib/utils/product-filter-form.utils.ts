import { FormControl, FormGroup } from '@angular/forms';
import {
    ProductFilterForm,
    ProductFilterFormInitialValue,
    ProductFilterFormValue
} from '../types/product-filter-form.types';
import { ProductItemDto } from '@sanctumlab/api-interfaces';

export function createProductFilterForm(): FormGroup<ProductFilterForm> {
    return new FormGroup<ProductFilterForm>({
        showUnavailable: new FormControl<boolean>(
            ProductFilterFormInitialValue.showUnavailable,
            {
                nonNullable: true,
                validators: []
            }
        ),
        search: new FormControl<string>(ProductFilterFormInitialValue.search, {
            nonNullable: true,
            validators: []
        })
    });
}

export function applyFilter(
    items: ProductItemDto[],
    filter: Partial<ProductFilterFormValue>
): ProductItemDto[] {
    let filterItems = [...items];

    if (!filter.showUnavailable) {
        filterItems = filterItems.filter(item => item.available);
    }

    if (filter.search && filter.search.length > 0) {
        return filterItems.filter(item =>
            Object.values(item).find(attribute =>
                attribute
                    .toString()
                    .toLowerCase()
                    .includes(filter.search?.toLowerCase() ?? '')
            )
        );
    }

    return filterItems;
}
