import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { MenuListViewComponent } from '../views/menu-list-view.component';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';

@Component({
    selector: 'ngx-menu-list-container',
    standalone: true,
    imports: [MenuListViewComponent, AsyncPipe],
    template: `<ngx-menu-list-view [items]="items$ | async" />`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListContainerComponent implements OnInit, OnChanges {
    @Input() category!: ProductItemCategory;
    protected items$!: Observable<ProductItemDto[]>;

    constructor(private menuApiService: ProductApiService) {}

    ngOnInit() {
        this.items$ = this.menuApiService.retrieveProductsByCategoryStream(
            this.category
        );
        this.menuApiService.sendRetrieveProductList();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['category'].previousValue !==
            changes['category'].currentValue
        ) {
            this.items$ = this.menuApiService.retrieveProductsByCategoryStream(
                changes['category'].currentValue
            );
        }
    }
}
