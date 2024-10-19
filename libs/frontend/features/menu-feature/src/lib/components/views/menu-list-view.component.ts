import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuCardComponent } from '@sanctumlab/fe/component-library';
import { MenuItem } from '@sanctumlab/api-interfaces';

@Component({
    selector: 'ngx-menu-list-view',
    standalone: true,
    imports: [MenuCardComponent],
    template: `@if (items && items.length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            @for (item of items; track item.id) {
                <ngx-clib-menu-card
                    [id]="item.id"
                    [title]="item.name"
                    [description]="item.description"
                />
            }
        </div>
    }`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListViewComponent {
    @Input() items: MenuItem[] | null = [];
}
