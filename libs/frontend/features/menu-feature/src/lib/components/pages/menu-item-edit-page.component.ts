import {
    ChangeDetectionStrategy,
    Component,
    EnvironmentInjector,
    Input,
    OnInit,
    Signal
} from '@angular/core';
import { MenuItemFormContainerComponent } from '../containers/menu-item-form-container.component';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import {
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';
import { ProductFormSubmitEvent } from '../../types/product-item-form.types';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ngx-menu-item-edit-page',
    imports: [MenuItemFormContainerComponent],
    template: `<ngx-menu-item-form-container
        [item]="currentItem()"
        title="menu:pages.edit.title"
        actionLabel="menu:pages.edit.mainAction"
        (submitEvent)="onSubmitEvent($event)"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemEditPageComponent implements OnInit {
    @Input() id!: string;
    protected currentItem!: Signal<ProductItemDto | null>;

    constructor(
        private readonly productApiService: ProductApiService,
        private injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.currentItem = toSignal(
            this.productApiService.retrieveCurrentProductStream(),
            { initialValue: null, injector: this.injector }
        );
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
