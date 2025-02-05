import {
    ChangeDetectionStrategy,
    Component,
    computed,
    EnvironmentInjector,
    input,
    OnInit,
    signal,
    Signal
} from '@angular/core';
import { MenuListViewComponent } from '../views/menu-list-view.component';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';
import {
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';
import { LoadingIndicatorComponent } from '@sanctumlab/fe/component-library';
import { AppNavigationService } from '@sanctumlab/fe/shared';
import { FormGroup } from '@angular/forms';
import {
    ProductFilterForm,
    ProductFilterFormValue
} from '../../types/product-filter-form.types';
import {
    applyFilter,
    createProductFilterForm,
    filterFormToQueryParams,
    getFilterFormInitialValues,
    queryParamsToFilterForm
} from '../../utils/product-filter-form.utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ngx-menu-list-container',
    imports: [MenuListViewComponent, LoadingIndicatorComponent, AsyncPipe],
    template: ` @if (isLoading()) {
            <ngx-clib-loading-indicator [isOverlay]="true" />
        }
        <ngx-menu-list-view
            [filterForm]="filterForm"
            [items]="items() | async"
            (itemSelect)="onItemSelect($event)"
            (createEvent)="onCreateEvent()"
        />`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListContainerComponent implements OnInit {
    public category = input.required<ProductItemCategory>();
    protected filterParams = signal<Partial<ProductFilterFormValue>>({});
    protected items = computed(() =>
        this.getItemsStream(this.category(), this.filterParams())
    );
    protected filterForm!: FormGroup<ProductFilterForm>;
    protected isLoading!: Signal<boolean>;

    constructor(
        private readonly productApiService: ProductApiService,
        private readonly appNavigationService: AppNavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.filterParams.set(
            queryParamsToFilterForm(this.activatedRoute.snapshot.queryParamMap)
        );
        this.filterForm = createProductFilterForm(this.filterParams());
        this.isLoading = toSignal(
            this.productApiService.retrieveProductsIsLoadingStream(),
            { initialValue: false, injector: this.injector }
        );

        this.filterForm.valueChanges
            .pipe(debounceTime(400), untilDestroyed(this))
            .subscribe(async value => {
                if (value) {
                    await this.appNavigationService.applyQueryParamsToRoute(
                        filterFormToQueryParams(value)
                    );
                }
            });

        this.productApiService.sendRetrieveProductList();
    }

    private getItemsStream(
        category: ProductItemCategory,
        filterParams: Partial<ProductFilterFormValue>
    ): Observable<ProductItemDto[]> {
        return combineLatest([
            this.productApiService.retrieveProductsByCategoryStream(category),
            this.filterForm.valueChanges.pipe(
                startWith(getFilterFormInitialValues(filterParams))
            )
        ]).pipe(map(([items, filterForm]) => applyFilter(items, filterForm)));
    }

    protected onItemSelect(id: string): void {
        this.productApiService.sendSetCurrentProduct(id);
    }

    protected async onCreateEvent(): Promise<void> {
        await this.appNavigationService.navigateToMenuCreateItem();
    }
}
