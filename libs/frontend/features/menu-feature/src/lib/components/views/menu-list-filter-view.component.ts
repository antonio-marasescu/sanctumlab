import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductFilterForm } from '../../types/product-filter-form.types';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    TextInputComponent,
    ToggleInputComponent
} from '@sanctumlab/fe/component-library';

@Component({
    selector: 'ngx-menu-list-filter-view',
    standalone: true,
    imports: [ReactiveFormsModule, ToggleInputComponent, TextInputComponent],
    template: `<form
        [formGroup]="form"
        novalidate
        class="flex flex-row flex-wrap items-center gap-4 rounded-xl"
    >
        <div class="min-w-32 sm:min-w-64 md:min-w-96">
            <ngx-clib-text-input
                id="search"
                inputStyle="bordered"
                placeholder="menu:filter.searchPlaceholder"
                label="menu:filter.search"
                [control]="form.controls.search"
            />
        </div>
        <ngx-clib-toggle-input
            label="menu:filter.showAll"
            [control]="form.controls.showUnavailable"
        />
        <div class="flex-grow"></div>
    </form>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListFilterViewComponent {
    @Input({ required: true }) form!: FormGroup<ProductFilterForm>;
}
