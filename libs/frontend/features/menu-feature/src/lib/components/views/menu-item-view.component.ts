import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import {
    ButtonComponent,
    I18nPipe,
    ModalComponent
} from '@sanctumlab/fe/component-library';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { AdminRestrictDirective } from '@sanctumlab/fe/auth';
import { QuillViewComponent } from 'ngx-quill';

@Component({
    selector: 'ngx-menu-item-view',
    imports: [
        ButtonComponent,
        ModalComponent,
        AdminRestrictDirective,
        QuillViewComponent,
        I18nPipe
    ],
    template: ` <ngx-clib-modal
        [opened]="opened()"
        [positionBottom]="true"
        (closeEvent)="modalClose.emit()"
    >
        @let productItem = item();
        <div content>
            @if (productItem) {
                <div class="flex flex-col gap-4">
                    <div class="flex gap-4">
                        <h2 class="text-xl md:text-2xl lg:text-3xl font-bold">
                            {{ productItem.name }}
                        </h2>
                        <div class="flex-grow"></div>
                        @if (!productItem.available) {
                            <div>
                                <div
                                    class="badge badge-error badge-sm md:badge-md"
                                >
                                    {{
                                        'menu:pages.list.indicator.unavailable'
                                            | i18nTranslate
                                    }}
                                </div>
                            </div>
                        }
                    </div>
                    <div class="flex gap-2">
                        @for (tag of productItem.tags; track tag) {
                            <div class="badge badge-accent">{{ tag }}</div>
                        }
                    </div>

                    <p>{{ productItem.description }}</p>

                    <div class="collapse bg-base-200 collapse-open">
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            {{ 'menu:pages.list.view.recipe' | i18nTranslate }}
                        </div>
                        <div class="collapse-content">
                            <quill-view
                                [content]="productItem.recipe"
                            ></quill-view>
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
            @if (productItem) {
                <ngx-clib-button
                    id="delete-button"
                    *ngxAuthAdminRestrict
                    label="menu:pages.list.view.actions.delete"
                    [isResponsive]="true"
                    theme="error"
                    (clickEvent)="deleteEvent.emit(productItem.id || '')"
                />
                @if (productItem.available) {
                    <ngx-clib-button
                        id="disable-button"
                        *ngxAuthAdminRestrict
                        label="menu:pages.list.view.actions.disable"
                        [isResponsive]="true"
                        theme="error"
                        (clickEvent)="disableEvent.emit(productItem || '')"
                    />
                } @else {
                    <ngx-clib-button
                        id="enable-button"
                        *ngxAuthAdminRestrict
                        label="menu:pages.list.view.actions.enable"
                        [isResponsive]="true"
                        theme="success"
                        (clickEvent)="enableEvent.emit(productItem || '')"
                    />
                }
            }
            <ngx-clib-button
                *ngxAuthAdminRestrict
                id="update-button"
                label="menu:pages.list.view.actions.update"
                [isResponsive]="true"
                theme="primary"
                (clickEvent)="editEvent.emit(item()?.id || '')"
            />
        </div>
    </ngx-clib-modal>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemViewComponent {
    public item = input.required<ProductItemDto | null>();
    public opened = input<boolean>(false);
    public modalClose = output<void>();
    public editEvent = output<string>();
    public disableEvent = output<ProductItemDto>();
    public enableEvent = output<ProductItemDto>();
    public deleteEvent = output<string>();
}
