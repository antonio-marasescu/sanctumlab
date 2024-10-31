import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { MenuListViewComponent } from '../views/menu-list-view.component';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';
import { ModalComponent } from '@sanctumlab/fe/component-library';
import { Store } from '@ngrx/store';
import { MenuActions } from '../../state/menu.actions';
import { AppNavigationService } from '@sanctumlab/fe/shared';
import { FormGroup } from '@angular/forms';
import {
    ProductFilterForm,
    ProductFilterFormInitialValue
} from '../../types/product-filter-form.types';
import {
    applyFilter,
    createProductFilterForm
} from '../../utils/product-filter-form.utils';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'ngx-menu-list-container',
    standalone: true,
    imports: [MenuListViewComponent, AsyncPipe, ModalComponent],
    template: `<ngx-menu-list-view
        [filterForm]="filterForm"
        [items]="items$ | async"
        (itemSelect)="onItemSelect($event)"
        (createEvent)="onCreateEvent()"
    /> `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListContainerComponent implements OnInit, OnChanges {
    @Input() category!: ProductItemCategory;
    protected items$!: Observable<ProductItemDto[]>;
    protected filterForm!: FormGroup<ProductFilterForm>;

    constructor(
        private menuApiService: ProductApiService,
        private store: Store,
        private appNavigationService: AppNavigationService
    ) {}

    ngOnInit() {
        this.filterForm = createProductFilterForm();
        this.menuApiService.retrieveProductsByCategoryStream(this.category);
        this.items$ = combineLatest([
            this.menuApiService.retrieveProductsByCategoryStream(this.category),
            this.filterForm.valueChanges.pipe(
                startWith(ProductFilterFormInitialValue)
            )
        ]).pipe(map(([items, filterForm]) => applyFilter(items, filterForm)));
        this.menuApiService.sendRetrieveProductList();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['category'].previousValue !==
            changes['category'].currentValue
        ) {
            this.items$ = this.menuApiService.retrieveProductsByCategoryStream(
                changes['category'].currentValue
            );
        }
    }

    protected onItemSelect(item: ProductItemDto): void {
        this.store.dispatch(MenuActions.selectItem({ item }));
    }

    protected async onCreateEvent(): Promise<void> {
        await this.appNavigationService.navigateToMenuCreateItem();
    }
}
