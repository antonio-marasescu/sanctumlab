import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {
    ButtonComponent,
    ModalComponent
} from '@sanctumlab/fe/component-library';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { MarkdownComponent } from 'ngx-markdown';
import { AdminRestrictDirective } from '@sanctumlab/fe/auth-fe';

@Component({
    selector: 'ngx-menu-item-view',
    standalone: true,
    imports: [
        ButtonComponent,
        ModalComponent,
        MarkdownComponent,
        AdminRestrictDirective
    ],
    template: ` <ngx-clib-modal
        [opened]="opened"
        (closeEvent)="modalClose.emit()"
    >
        <div content>
            @if (item) {
                <div class="flex flex-col gap-4">
                    <div class="flex gap-4">
                        <h2 class="text-xl md:text-2xl lg:text-3xl font-bold">
                            {{ item.name }}
                        </h2>
                        <div class="flex-grow"></div>
                        @if (!item.available) {
                            <div>
                                <div
                                    class="badge badge-error badge-sm md:badge-md"
                                >
                                    UNAVAILABLE
                                </div>
                            </div>
                        }
                    </div>
                    <div class="flex gap-2">
                        @for (tag of item.tags; track tag) {
                            <div class="badge badge-accent">{{ tag }}</div>
                        }
                    </div>

                    <p>{{ item.description }}</p>

                    <div class="collapse bg-base-200 collapse-open">
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            Recipe
                        </div>
                        <div class="collapse-content">
                            <markdown>{{ item.recipe }}</markdown>
                        </div>
                    </div>
                </div>
            }
        </div>
        <div actions class="flex gap-4">
            <ngx-clib-button
                label="Close"
                theme="ghost"
                [size]="'sm'"
                (clickEvent)="modalClose.emit()"
            />
            @if (item) {
                @if (item.available) {
                    <ngx-clib-button
                        *ngxAuthAdminRestrict
                        label="Disable"
                        [size]="'sm'"
                        theme="error"
                        (clickEvent)="disableEvent.emit(item)"
                    />
                } @else {
                    <ngx-clib-button
                        *ngxAuthAdminRestrict
                        label="Enable"
                        [size]="'sm'"
                        theme="success"
                        (clickEvent)="enableEvent.emit(item)"
                    />
                }
            }
            <ngx-clib-button
                *ngxAuthAdminRestrict
                label="Edit"
                [size]="'sm'"
                theme="primary"
                (clickEvent)="editEvent.emit(item?.id || '')"
            />
        </div>
    </ngx-clib-modal>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemViewComponent {
    @Input({ required: true }) opened = false;
    @Input({ required: true }) item!: ProductItemDto | null;
    @Output() modalClose = new EventEmitter<void>();
    @Output() editEvent = new EventEmitter<string>();
    @Output() disableEvent = new EventEmitter<ProductItemDto>();
    @Output() enableEvent = new EventEmitter<ProductItemDto>();
}
