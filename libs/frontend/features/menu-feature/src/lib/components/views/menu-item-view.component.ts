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
import { AdminRestrictDirective } from '@sanctumlab/fe/auth';
import { QuillViewComponent } from 'ngx-quill';
import { I18NextModule } from 'angular-i18next';

@Component({
    selector: 'ngx-menu-item-view',
    standalone: true,
    imports: [
        ButtonComponent,
        ModalComponent,
        AdminRestrictDirective,
        QuillViewComponent,
        I18NextModule
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
                                    {{
                                        'menu:pages.list.indicator.unavailable'
                                            | i18nextEager
                                    }}
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
                            {{ 'menu:pages.list.view.recipe' | i18nextEager }}
                        </div>
                        <div class="collapse-content">
                            <quill-view [content]="item.recipe"></quill-view>
                        </div>
                    </div>
                </div>
            }
        </div>
        <div actions class="flex flex-wrap justify-end gap-4">
            <ngx-clib-button
                label="menu:pages.list.view.actions.close"
                theme="ghost"
                [isResponsive]="true"
                (clickEvent)="modalClose.emit()"
            />
            @if (item) {
                <ngx-clib-button
                    *ngxAuthAdminRestrict
                    label="menu:pages.list.view.actions.delete"
                    [isResponsive]="true"
                    theme="error"
                    (clickEvent)="deleteEvent.emit(item.id)"
                />
                @if (item.available) {
                    <ngx-clib-button
                        *ngxAuthAdminRestrict
                        label="menu:pages.list.view.actions.disable"
                        [isResponsive]="true"
                        theme="secondary"
                        (clickEvent)="disableEvent.emit(item)"
                    />
                } @else {
                    <ngx-clib-button
                        *ngxAuthAdminRestrict
                        label="menu:pages.list.view.actions.enable"
                        [isResponsive]="true"
                        theme="success"
                        (clickEvent)="enableEvent.emit(item)"
                    />
                }
            }
            <ngx-clib-button
                *ngxAuthAdminRestrict
                label="menu:pages.list.view.actions.update"
                [isResponsive]="true"
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
    @Output() deleteEvent = new EventEmitter<string>();
}
