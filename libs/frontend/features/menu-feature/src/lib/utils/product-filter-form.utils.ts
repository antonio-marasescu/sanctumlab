import { FormControl, FormGroup } from '@angular/forms';
import {
    ProductFilterForm,
    ProductFilterFormInitialValue,
    ProductFilterFormValue
} from '../types/product-filter-form.types';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { ParamMap, Params } from '@angular/router';

export function createProductFilterForm(
    values: Partial<ProductFilterFormValue>
): FormGroup<ProductFilterForm> {
    const initialValues = getFilterFormInitialValues(values);
    return new FormGroup<ProductFilterForm>({
        showUnavailable: new FormControl<boolean>(
            initialValues.showUnavailable,
            {
                nonNullable: true,
                validators: []
            }
        ),
        search: new FormControl<string>(initialValues.search, {
            nonNullable: true,
            validators: []
        })
    });
}

export function getFilterFormInitialValues(
    values: Partial<ProductFilterFormValue>
): ProductFilterFormValue {
    return {
        showUnavailable:
            values.showUnavailable ??
            ProductFilterFormInitialValue.showUnavailable,
        search: values.search ?? ProductFilterFormInitialValue.search
    };
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

export function filterFormToQueryParams(
    values: Partial<ProductFilterFormValue>
): Params {
    return Object.keys(values).reduce((accum, key) => {
        const typedKey = key as keyof ProductFilterFormValue;
        if (
            values[typedKey] !== undefined &&
            values[typedKey] !== null &&
            values[typedKey] !== ''
        ) {
            return {
                ...accum,
                [key]: values[typedKey].toString()
            };
        }
        return accum;
    }, {});
}

export function queryParamsToFilterForm(
    params: ParamMap
): Partial<ProductFilterFormValue> {
    const showUnavailableParam = params.get('showUnavailable');
    const searchParam = params.get('search');
    return {
        showUnavailable:
            showUnavailableParam !== null
                ? showUnavailableParam === 'true'
                : undefined,
        search: searchParam !== null ? searchParam : undefined
    };
}
