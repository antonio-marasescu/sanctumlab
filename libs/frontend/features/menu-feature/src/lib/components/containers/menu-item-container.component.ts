import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductItemDto } from '@sanctumlab/api-interfaces';
import { MenuItemViewComponent } from '../views/menu-item-view.component';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { selectMenuStateSelectedItem } from '../../state/menu.selectors';
import { AsyncPipe } from '@angular/common';
import { MenuActions } from '../../state/menu.actions';
import { AppNavigationService } from '@sanctumlab/fe/shared-fe';

@UntilDestroy()
@Component({
    selector: `ngx-menu-item-container`,
    standalone: true,
    imports: [MenuItemViewComponent, AsyncPipe],
    template: `
        @if (item$) {
            @let item = item$ | async;
            <ngx-menu-item-view
                [item]="item"
                [opened]="item !== null"
                (modalClose)="onModalClosed()"
                (editEvent)="onItemEdit($event)"
            />
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemContainerComponent implements OnInit {
    protected item$!: Observable<ProductItemDto | null>;

    constructor(
        private store: Store,
        private appNavigationService: AppNavigationService
    ) {}

    ngOnInit() {
        this.item$ = this.store.select(selectMenuStateSelectedItem());
    }

    protected onModalClosed(): void {
        this.store.dispatch(MenuActions.deselectItem());
    }

    protected async onItemEdit(id: string): Promise<void> {
        await this.appNavigationService.navigateToMenuEditItem(id);
    }
}
