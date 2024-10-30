import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
} from '@angular/core';
import { MenuItemFormContainerComponent } from '../containers/menu-item-form-container.component';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import { Observable } from 'rxjs';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ngx-menu-item-edit-page',
    standalone: true,
    imports: [MenuItemFormContainerComponent, AsyncPipe],
    template: `<ngx-menu-item-form-container
        [item]="currentItem$ | async"
        title="Edit Product"
        actionLabel="Update"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemEditPageComponent implements OnInit {
    @Input() id!: string;
    protected currentItem$!: Observable<ProductItemDto | null>;

    constructor(private productApiService: ProductApiService) {}

    ngOnInit() {
        this.currentItem$ =
            this.productApiService.retrieveCurrentProductStream();
        this.productApiService.sendRetrieveProductById(this.id);
    }
}
