import {
    ChangeDetectionStrategy,
    Component,
    EnvironmentInjector,
    input,
    OnInit,
    output,
    signal
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    ProductFormSubmitEvent,
    ProductItemForm
} from '../../types/product-item-form.types';
import { createProductItemForm } from '../../utils/product-item-form.utils';
import { MenuItemFormViewComponent } from '../views/menu-item-form-view.component';
import {
    ProductItemCategoryOptions,
    ProductItemDto
} from '@sanctumlab/api-interfaces';
import {
    LoadingIndicatorComponent,
    SelectOption
} from '@sanctumlab/fe/component-library';
import { AppNavigationService } from '@sanctumlab/fe/shared';
import { ProductApiService } from '@sanctumlab/fe/data-access';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'ngx-menu-item-form-container',
    imports: [MenuItemFormViewComponent, LoadingIndicatorComponent],
    template: `@if (isLoading()) {
            <ngx-clib-loading-indicator [isOverlay]="true" />
        }
        <ngx-menu-item-form-view
            [form]="form"
            [categoryOptions]="categoryOptions"
            [title]="title()"
            [actionLabel]="actionLabel()"
            (closeEvent)="onCloseEvent()"
            (submitEvent)="onSubmitEvent()"
        />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemFormContainerComponent implements OnInit {
    public item = input.required<ProductItemDto | null>();
    public title = input<string>('');
    public actionLabel = input<string>('');
    public submitEvent = output<ProductFormSubmitEvent>();
    protected isLoading = signal<boolean>(false).asReadonly();
    protected form!: FormGroup<ProductItemForm>;
    protected readonly categoryOptions: SelectOption[] = [
        ...ProductItemCategoryOptions
    ];

    constructor(
        private readonly productApiService: ProductApiService,
        private readonly appNavigationService: AppNavigationService,
        private readonly injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.isLoading = toSignal(
            this.productApiService.retrieveProductsIsLoadingStream(),
            { initialValue: false, injector: this.injector }
        );
        this.form = createProductItemForm(this.item());
        toObservable(this.item, { injector: this.injector })
            .pipe(untilDestroyed(this))
            .subscribe(value => {
                if (value) {
                    this.form.patchValue({ ...value });
                }
            });
    }

    protected onSubmitEvent(): void {
        if (this.form.invalid) {
            return;
        }
        const formValue = this.form.getRawValue();
        this.submitEvent.emit({ form: formValue, id: this.item()?.id });
    }

    protected async onCloseEvent(): Promise<void> {
        await this.appNavigationService.navigateToMenuFeature();
    }
}
