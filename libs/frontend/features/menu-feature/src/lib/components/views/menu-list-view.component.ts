import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import {
    ButtonComponent,
    ItemCardComponent,
    PlaceholderComponent
} from '@sanctumlab/fe/component-library';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { AdminRestrictDirective } from '@sanctumlab/fe/auth';
import { FormGroup } from '@angular/forms';
import { ProductFilterForm } from '../../types/product-filter-form.types';
import { MenuListFilterViewComponent } from './menu-list-filter-view.component';

@Component({
    selector: 'ngx-menu-list-view',
    imports: [
        ItemCardComponent,
        ButtonComponent,
        AdminRestrictDirective,
        MenuListFilterViewComponent,
        PlaceholderComponent
    ],
    template: `<div class="m-12">
        <div class="flex flex-row-reverse">
            <ngx-clib-button
                id="create-button"
                *ngxAuthAdminRestrict
                label="menu:pages.list.redirectToCreate"
                theme="primary"
                [isResponsive]="true"
                (clickEvent)="createEvent.emit()"
            />
        </div>
        <ngx-menu-list-filter-view [form]="filterForm()">
        </ngx-menu-list-filter-view>
        @let itemsData = items();
        @if (itemsData && itemsData.length > 0) {
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center pt-8"
            >
                @for (item of items(); track item.id) {
                    <ngx-clib-item-card
                        [id]="item.id || ''"
                        [title]="item.name || ''"
                        [description]="item.description"
                        [tags]="item.tags || []"
                        [hasIndicator]="!item.available"
                        indicator="menu:pages.list.indicator.unavailable"
                        indicatorTheme="error"
                        (cardClick)="itemSelect.emit(item.id || '')"
                    />
                }
            </div>
        } @else {
            <div class="pt-12 w-full flex justify-center">
                <ngx-clib-placeholder
                    title="menu:pages.list.placeholder.title"
                    label="menu:pages.list.placeholder.message"
                />
            </div>
        }
    </div>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListViewComponent {
    public filterForm = input.required<FormGroup<ProductFilterForm>>();
    public items = input<ProductItemDto[] | null>([]);
    public itemSelect = output<string>();
    public createEvent = output<void>();
}
