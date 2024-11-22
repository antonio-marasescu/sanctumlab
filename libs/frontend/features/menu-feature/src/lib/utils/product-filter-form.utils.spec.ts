import { FormGroup } from '@angular/forms';
import {
    createMockProductItemDto,
    ProductItemDto
} from '@sanctumlab/api-interfaces';
import { ParamMap } from '@angular/router';
import { convertToParamMap } from '@angular/router';
import {
    applyFilter,
    createProductFilterForm,
    filterFormToQueryParams,
    getFilterFormInitialValues,
    queryParamsToFilterForm
} from './product-filter-form.utils';

describe('productFilterFormUtils', () => {
    describe('createProductFilterForm', () => {
        it('should create a form with default values', () => {
            const form: FormGroup = createProductFilterForm({});
            expect(form.value).toEqual({
                showUnavailable: false,
                search: ''
            });
        });

        it('should create a form with given values', () => {
            const form: FormGroup = createProductFilterForm({
                showUnavailable: true,
                search: 'test'
            });
            expect(form.value).toEqual({
                showUnavailable: true,
                search: 'test'
            });
        });
    });

    describe('getFilterFormInitialValues', () => {
        it('should return default values if no values are provided', () => {
            const values = getFilterFormInitialValues({});
            expect(values).toEqual({
                showUnavailable: false,
                search: ''
            });
        });

        it('should return provided values along with defaults for missing values', () => {
            const values = getFilterFormInitialValues({ search: 'example' });
            expect(values).toEqual({
                showUnavailable: false,
                search: 'example'
            });
        });
    });

    describe('applyFilter', () => {
        const items: ProductItemDto[] = [
            createMockProductItemDto({
                id: '1',
                name: 'Product A',
                available: true
            }),
            createMockProductItemDto({
                id: '2',
                name: 'Product B',
                available: false
            }),
            createMockProductItemDto({
                id: '3',
                name: 'Another Thing',
                available: true
            })
        ];

        it('should filter out unavailable products when showUnavailable is false', () => {
            const filteredItems = applyFilter(items, {
                showUnavailable: false
            });
            expect(filteredItems.length).toBe(2);
            expect(filteredItems).toEqual([
                createMockProductItemDto({
                    id: '1',
                    name: 'Product A',
                    available: true
                }),
                createMockProductItemDto({
                    id: '3',
                    name: 'Another Thing',
                    available: true
                })
            ]);
        });

        it('should return all products when showUnavailable is true', () => {
            const filteredItems = applyFilter(items, { showUnavailable: true });
            expect(filteredItems.length).toBe(3);
        });

        it('should filter products by search term', () => {
            const filteredItems = applyFilter(items, { search: 'Product' });
            expect(filteredItems.length).toBe(1);
            expect(filteredItems).toEqual([
                createMockProductItemDto({
                    id: '1',
                    name: 'Product A',
                    available: true
                })
            ]);
        });

        it('should apply both search and availability filters', () => {
            const filteredItems = applyFilter(items, {
                showUnavailable: false,
                search: 'Another'
            });
            expect(filteredItems.length).toBe(1);
            expect(filteredItems).toEqual([
                createMockProductItemDto({
                    id: '3',
                    name: 'Another Thing',
                    available: true
                })
            ]);
        });
    });

    describe('filterFormToQueryParams', () => {
        it('should convert filter form values to query params', () => {
            const params = filterFormToQueryParams({
                showUnavailable: true,
                search: 'test'
            });
            expect(params).toEqual({
                showUnavailable: 'true',
                search: 'test'
            });
        });

        it('should ignore undefined, null or empty string values', () => {
            const params = filterFormToQueryParams({
                showUnavailable: undefined,
                search: ''
            });
            expect(params).toEqual({});
        });
    });

    describe('queryParamsToFilterForm', () => {
        it('should convert query params to filter form values', () => {
            const paramMap: ParamMap = convertToParamMap({
                showUnavailable: 'true',
                search: 'test'
            });
            const filterFormValues = queryParamsToFilterForm(paramMap);
            expect(filterFormValues).toEqual({
                showUnavailable: true,
                search: 'test'
            });
        });

        it('should handle missing params gracefully', () => {
            const paramMap: ParamMap = convertToParamMap({});
            const filterFormValues = queryParamsToFilterForm(paramMap);
            expect(filterFormValues).toEqual({});
        });
    });
});
