import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductItemForm } from '../../types/product-item-form.types';
import {
    ButtonComponent,
    I18nPipe,
    ListInputComponent,
    MarkdownInputComponent,
    SelectInputComponent,
    SelectOption,
    TextareaInputComponent,
    TextInputComponent,
    ToggleInputComponent
} from '@sanctumlab/fe/component-library';

@Component({
    selector: 'ngx-menu-item-form-view',
    imports: [
        TextInputComponent,
        TextareaInputComponent,
        ToggleInputComponent,
        ButtonComponent,
        MarkdownInputComponent,
        ReactiveFormsModule,
        SelectInputComponent,
        ListInputComponent,
        I18nPipe
    ],
    template: `<div class="p-8">
            <h1 class="text-xl md:text-2xl">{{ title() | i18nTranslate }}</h1>
            <form
                class="grid grid-cols-1 gap-8 pt-4"
                [formGroup]="form()"
                novalidate
            >
                <div class="flex flex-col md:flex-row gap-4 md:items-center">
                    <div class="md:min-w-64 lg:min-w-96">
                        <ngx-clib-text-input
                            id="name"
                            label="menu:form.name"
                            placeholder="menu:form.namePlaceholder"
                            inputStyle="default"
                            [control]="form().controls.name"
                        />
                    </div>
                    <div class="flex-grow"></div>
                    <ngx-clib-toggle-input
                        label="menu:form.available"
                        [control]="form().controls.available"
                    ></ngx-clib-toggle-input>
                </div>
                <ngx-clib-select-input
                    id="category"
                    label="menu:form.category"
                    inputStyle="default"
                    placeholder="menu:form.categoryPlaceholder"
                    [control]="form().controls.category"
                    [options]="categoryOptions()"
                />
                <ngx-clib-textarea-input
                    id="description"
                    label="menu:form.description"
                    placeholder="menu:form.descriptionPlaceholder"
                    [control]="form().controls.description"
                />
                <ngx-clib-list-input
                    id="tags"
                    label="menu:form.tags"
                    placeholder="menu:form.tagsPlaceholder"
                    [control]="form().controls.tags"
                />
                <ngx-clib-markdown-input
                    id="recipe"
                    label="menu:form.recipe"
                    placeholder="menu:form.recipePlaceholder"
                    [control]="form().controls.recipe"
                />
            </form>
        </div>
        <div
            class="sticky bottom-0 flex flex-row-reverse justify-between bg-base-100 pt-4 pb-4 pr-6 pl-6 gap-4"
        >
            <ngx-clib-button
                id="submit-button"
                [label]="actionLabel()"
                [size]="'sm'"
                theme="neutral"
                (clickEvent)="submitEvent.emit()"
            />
            <ngx-clib-button
                id="close-button"
                label="menu:form.actions.close"
                [size]="'sm'"
                theme="ghost"
                (clickEvent)="closeEvent.emit()"
            />
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemFormViewComponent {
    public form = input.required<FormGroup<ProductItemForm>>();
    public categoryOptions = input<SelectOption[]>([]);
    public title = input<string>('');
    public actionLabel = input<string>('');
    public submitEvent = output<void>();
    public closeEvent = output<void>();
}
