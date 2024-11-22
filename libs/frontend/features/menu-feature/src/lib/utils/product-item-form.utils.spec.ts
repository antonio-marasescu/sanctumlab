import { createProductItemForm } from './product-item-form.utils';
import { createMockProductItemDto } from '@sanctumlab/api-interfaces';

describe('productItemFormUtils', () => {
    it('should create the form with fallback values', () => {
        const response = createProductItemForm();
        expect(response.getRawValue()).toEqual({
            name: '',
            description: '',
            category: '',
            recipe: '',
            tags: [],
            available: false
        });
    });

    it('should create the form with initial values', () => {
        const payload = createMockProductItemDto();
        const response = createProductItemForm(payload);
        expect(response.getRawValue()).toEqual({
            ...payload,
            id: undefined
        });
    });
});
