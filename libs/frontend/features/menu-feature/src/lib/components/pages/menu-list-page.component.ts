import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuListContainerComponent } from '../containers/menu-list-container.component';
import { ActivatedRoute } from '@angular/router';
import { ProductItemCategory } from '@sanctumlab/api-interfaces';
import { MenuItemContainerComponent } from '../containers/menu-item-container.component';

@Component({
    selector: 'ngx-menu-list-page',
    imports: [MenuListContainerComponent, MenuItemContainerComponent],
    template: `<ngx-menu-list-container [category]="category" />
        <ngx-menu-item-container />`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListPageComponent implements OnInit {
    protected category!: ProductItemCategory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.category = this.activatedRoute.snapshot.data['category'];
    }
}
