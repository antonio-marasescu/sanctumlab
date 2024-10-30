import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductItemDto } from '@sanctumlab/api-interfaces';

export const MenuActions = createActionGroup({
    source: 'Menu',
    events: {
        SelectItem: props<{ item: ProductItemDto }>(),
        DeselectItem: emptyProps()
    }
});
