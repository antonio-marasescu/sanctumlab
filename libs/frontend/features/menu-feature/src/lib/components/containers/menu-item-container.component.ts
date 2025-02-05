import {
    ChangeDetectionStrategy,
    Component,
    EnvironmentInjector,
    OnInit,
    Signal
} from '@angular/core';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { MenuItemViewComponent } from '../views/menu-item-view.component';
import { AppNavigationService } from '@sanctumlab/fe/shared';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: `ngx-menu-item-container`,
    imports: [MenuItemViewComponent],
    template: `
        @let item = currentItem();
        <ngx-menu-item-view
            [item]="item"
            [opened]="item !== null"
            (modalClose)="onModalClosed()"
            (editEvent)="onItemEdit($event)"
            (enableEvent)="onEnableEvent($event)"
            (disableEvent)="onDisableEvent($event)"
            (deleteEvent)="onDeleteEvent($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemContainerComponent implements OnInit {
    protected currentItem!: Signal<ProductItemDto | null>;

    constructor(
        private readonly appNavigationService: AppNavigationService,
        private readonly productApiService: ProductApiService,
        private readonly injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.currentItem = toSignal(
            this.productApiService.retrieveCurrentProductStream(),
            { initialValue: null, injector: this.injector }
        );
    }

    protected onModalClosed(): void {
        this.productApiService.sendUnsetCurrentProduct();
    }

    protected async onItemEdit(id: string): Promise<void> {
        await this.appNavigationService.navigateToMenuEditItem(id);
    }

    protected onDeleteEvent(id: string): void {
        this.productApiService.sendUnsetCurrentProduct();
        this.productApiService.sendRemoveProduct(id);
    }

    protected onEnableEvent(item: ProductItemDto): void {
        this.productApiService.sendUpdateProduct(item.id, {
            ...item,
            available: true
        });
    }

    protected onDisableEvent(item: ProductItemDto): void {
        this.productApiService.sendUpdateProduct(item.id, {
            ...item,
            available: false
        });
    }
}
