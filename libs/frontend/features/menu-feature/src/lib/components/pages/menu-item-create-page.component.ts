import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItemFormContainerComponent } from '../containers/menu-item-form-container.component';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import { ProductFormSubmitEvent } from '../../types/product-item-form.types';
import { ProductItemCategory } from '@sanctumlab/api-interfaces';

@Component({
    selector: 'ngx-menu-item-create-page',
    imports: [MenuItemFormContainerComponent],
    template: `<ngx-menu-item-form-container
        [item]="null"
        title="menu:pages.create.title"
        actionLabel="menu:pages.create.mainAction"
        (submitEvent)="onSubmitEvent($event)"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemCreatePageComponent {
    constructor(private readonly productApiService: ProductApiService) {}

    protected onSubmitEvent({ form }: ProductFormSubmitEvent) {
        this.productApiService.sendCreateProduct({
            ...form,
            category: form.category as ProductItemCategory
        });
    }
}
