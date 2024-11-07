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
import {
    LoadingIndicatorComponent,
    ModalComponent
} from '@sanctumlab/fe/component-library';
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
    imports: [
        MenuListViewComponent,
        AsyncPipe,
        ModalComponent,
        LoadingIndicatorComponent
    ],
    template: ` @if (isLoading$ | async) {
            <ngx-clib-loading-indicator [isOverlay]="true" />
        }
        <ngx-menu-list-view
            [filterForm]="filterForm"
            [items]="items$ | async"
            (itemSelect)="onItemSelect($event)"
            (createEvent)="onCreateEvent()"
        />`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListContainerComponent implements OnInit, OnChanges {
    @Input() category!: ProductItemCategory;
    protected items$!: Observable<ProductItemDto[]>;
    protected isLoading$!: Observable<boolean>;
    protected filterForm!: FormGroup<ProductFilterForm>;

    constructor(
        private readonly productApiService: ProductApiService,
        private readonly appNavigationService: AppNavigationService
    ) {}

    ngOnInit() {
        this.filterForm = createProductFilterForm();
        this.isLoading$ =
            this.productApiService.retrieveProductsIsLoadingStream();
        this.items$ = combineLatest([
            this.productApiService.retrieveProductsByCategoryStream(
                this.category
            ),
            this.filterForm.valueChanges.pipe(
                startWith(ProductFilterFormInitialValue)
            )
        ]).pipe(map(([items, filterForm]) => applyFilter(items, filterForm)));
        this.productApiService.sendRetrieveProductList();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['category'].previousValue !==
            changes['category'].currentValue
        ) {
            this.items$ =
                this.productApiService.retrieveProductsByCategoryStream(
                    changes['category'].currentValue
                );
        }
    }

    protected onItemSelect(id: string): void {
        this.productApiService.sendSetCurrentProduct(id);
    }

    protected async onCreateEvent(): Promise<void> {
        await this.appNavigationService.navigateToMenuCreateItem();
    }
}
