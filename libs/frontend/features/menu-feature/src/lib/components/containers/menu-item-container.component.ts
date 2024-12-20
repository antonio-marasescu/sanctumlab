import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { MenuItemViewComponent } from '../views/menu-item-view.component';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AsyncPipe } from '@angular/common';
import { AppNavigationService } from '@sanctumlab/fe/shared';
import { ProductApiService } from '@sanctumlab/fe/data-access';

@UntilDestroy()
@Component({
    selector: `ngx-menu-item-container`,
    imports: [MenuItemViewComponent, AsyncPipe],
    template: `
        @if (item$) {
            @let item = item$ | async;
            <ngx-menu-item-view
                [item]="item"
                [opened]="item !== null"
                (modalClose)="onModalClosed()"
                (editEvent)="onItemEdit($event)"
                (enableEvent)="onEnableEvent($event)"
                (disableEvent)="onDisableEvent($event)"
                (deleteEvent)="onDeleteEvent($event)"
            />
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemContainerComponent implements OnInit {
    protected item$!: Observable<ProductItemDto | null>;

    constructor(
        private readonly appNavigationService: AppNavigationService,
        private readonly productApiService: ProductApiService
    ) {}

    ngOnInit() {
        this.item$ = this.productApiService.retrieveCurrentProductStream();
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
