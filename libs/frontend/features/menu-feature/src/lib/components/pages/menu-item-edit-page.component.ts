import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
} from '@angular/core';
import { MenuItemFormContainerComponent } from '../containers/menu-item-form-container.component';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import { Observable } from 'rxjs';
import {
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';
import { AsyncPipe } from '@angular/common';
import { ProductFormSubmitEvent } from '../../types/product-item-form.types';

@Component({
    selector: 'ngx-menu-item-edit-page',
    standalone: true,
    imports: [MenuItemFormContainerComponent, AsyncPipe],
    template: `<ngx-menu-item-form-container
        [item]="currentItem$ | async"
        title="Edit Product"
        actionLabel="Update"
        (submitEvent)="onSubmitEvent($event)"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemEditPageComponent implements OnInit {
    @Input() id!: string;
    protected currentItem$!: Observable<ProductItemDto | null>;

    constructor(private readonly productApiService: ProductApiService) {}

    ngOnInit() {
        this.currentItem$ =
            this.productApiService.retrieveCurrentProductStream();
        this.productApiService.sendRetrieveProductById(this.id);
    }

    protected onSubmitEvent({ form, id }: ProductFormSubmitEvent) {
        if (!id) {
            return;
        }
        this.productApiService.sendUpdateProduct(id, {
            ...form,
            category: form.category as ProductItemCategory
        });
    }
}
