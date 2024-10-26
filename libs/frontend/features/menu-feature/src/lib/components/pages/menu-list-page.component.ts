import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuListContainerComponent } from '../containers/menu-list-container.component';
import { ActivatedRoute } from '@angular/router';
import { ProductItemCategory } from '@sanctumlab/api-interfaces';

@Component({
    selector: 'ngx-menu-list-page',
    standalone: true,
    imports: [MenuListContainerComponent],
    template: `<ngx-menu-list-container [category]="category" />`,
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
