import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemCardComponent } from '@sanctumlab/fe/component-library';
import { ProductItemDto } from '@sanctumlab/api-interfaces';

@Component({
    selector: 'ngx-menu-list-view',
    standalone: true,
    imports: [ItemCardComponent],
    template: `@if (items && items.length > 0) {
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-12 items-center justify-center"
        >
            @for (item of items; track item.id) {
                <ngx-clib-item-card
                    [id]="item.id"
                    [title]="item.name"
                    [description]="item.description"
                    [tags]="item.tags"
                    [hasIndicator]="!item.available"
                    indicator="unavailable"
                    indicatorTheme="error"
                />
            }
        </div>
    }`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListViewComponent {
    @Input() items: ProductItemDto[] | null = [];
}
