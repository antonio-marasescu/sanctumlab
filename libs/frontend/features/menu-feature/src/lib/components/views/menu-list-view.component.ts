import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {
    ButtonComponent,
    ItemCardComponent
} from '@sanctumlab/fe/component-library';
import { ProductItemDto } from '@sanctumlab/api-interfaces';

@Component({
    selector: 'ngx-menu-list-view',
    standalone: true,
    imports: [ItemCardComponent, ButtonComponent],
    template: ` <div class="m-12">
        <div class="flex flex-row-reverse">
            <ngx-clib-button
                label="Create"
                theme="primary"
                [size]="'sm'"
                (clickEvent)="createEvent.emit()"
            />
        </div>
        @if (items && items.length > 0) {
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center pt-4"
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
                        (cardClick)="itemSelect.emit(item)"
                    />
                }
            </div>
        }
    </div>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListViewComponent {
    @Input() items: ProductItemDto[] | null = [];
    @Output() itemSelect = new EventEmitter<ProductItemDto>();
    @Output() createEvent = new EventEmitter<void>();
}
