import { ApiRestResourceConfig } from '../types/api-modules.types';

export const API_REST_CONFIG: ApiRestResourceConfig = {
    products: {
        methods: ['POST', 'GET'],
        subResources: {
            '{id}': {
                methods: ['PUT', 'DELETE', 'GET']
            }
        }
    },
    ingredients: {
        methods: ['POST', 'GET'],
        subResources: {
            '{id}': {
                methods: ['PUT', 'DELETE', 'GET']
            }
        }
    },
    recipes: {
        methods: ['POST', 'GET'],
        subResources: {
            '{id}': {
                methods: ['PUT', 'DELETE', 'GET']
            }
        }
    }
};
