import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    ProductFormSubmitEvent,
    ProductItemForm
} from '../../types/product-item-form.types';
import { createProductItemForm } from '../../utils/product-item-form.utils';
import { MenuItemFormViewComponent } from '../views/menu-item-form-view.component';
import {
    ProductItemCategory,
    ProductItemDto
} from '@sanctumlab/api-interfaces';
import { SelectOption } from '@sanctumlab/fe/component-library';
import { AppNavigationService } from '@sanctumlab/fe/shared';

@Component({
    selector: 'ngx-menu-item-form-container',
    standalone: true,
    imports: [MenuItemFormViewComponent],
    template: `<ngx-menu-item-form-view
        [form]="form"
        [categoryOptions]="categoryOptions"
        [title]="title"
        [actionLabel]="actionLabel"
        (closeEvent)="onCloseEvent()"
        (submitEvent)="onSubmitEvent()"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemFormContainerComponent implements OnInit, OnChanges {
    @Input({ required: true }) item?: ProductItemDto | null;
    @Input({ required: true }) title = '';
    @Input({ required: true }) actionLabel = '';
    @Output() submitEvent = new EventEmitter<ProductFormSubmitEvent>();

    protected form!: FormGroup<ProductItemForm>;
    protected readonly categoryOptions: SelectOption[] = [
        {
            id: ProductItemCategory.Cocktail,
            label: ProductItemCategory.Cocktail
        },
        {
            id: ProductItemCategory.Snacks,
            label: ProductItemCategory.Snacks
        }
    ];

    constructor(private appNavigationService: AppNavigationService) {}

    ngOnInit() {
        this.form = createProductItemForm(this.item);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['item'].previousValue !== changes['item'].currentValue) {
            this.updateFormValue(changes['item'].currentValue);
        }
    }

    protected updateFormValue(item?: ProductItemDto) {
        console.log('y', item);
        if (this.form) {
            this.form.patchValue({
                name: item?.name || '',
                description: item?.description || '',
                category: item?.category || '',
                tags: item?.tags || [],
                recipe: item?.recipe || '',
                available: item?.available || false
            });
        }
    }

    protected onSubmitEvent(): void {
        if (this.form.invalid) {
            return;
        }
        const formValue = this.form.getRawValue();
        this.submitEvent.emit({ form: formValue, id: this.item?.id });
    }

    protected async onCloseEvent(): Promise<void> {
        await this.appNavigationService.navigateToMenuFeature();
    }
}
