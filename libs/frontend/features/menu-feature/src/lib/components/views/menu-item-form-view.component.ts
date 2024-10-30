import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductItemForm } from '../../types/product-item-form.types';
import {
    ButtonComponent,
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
    standalone: true,
    imports: [
        TextInputComponent,
        TextareaInputComponent,
        ToggleInputComponent,
        ButtonComponent,
        MarkdownInputComponent,
        ReactiveFormsModule,
        SelectInputComponent,
        ListInputComponent
    ],
    template: ` <div class="p-8">
            <h1 class="text-xl md:text-2xl">{{ title }}</h1>
            <form
                class="grid grid-cols-1 gap-8 pt-4"
                [formGroup]="form"
                novalidate
            >
                <div class="flex flex-col md:flex-row gap-4 md:items-center">
                    <div class="md:min-w-64 lg:min-w-96">
                        <ngx-clib-text-input
                            id="name"
                            label="Name"
                            placeholder="Add a name"
                            inputStyle="default"
                            [control]="form.controls.name"
                        />
                    </div>
                    <div class="flex-grow"></div>
                    <ngx-clib-toggle-input
                        label="Available"
                        [control]="form.controls.available"
                    ></ngx-clib-toggle-input>
                </div>
                <ngx-clib-select-input
                    id="category"
                    label="Category"
                    inputStyle="default"
                    placeholder="Select a category"
                    [control]="form.controls.category"
                    [options]="categoryOptions"
                />
                <ngx-clib-textarea-input
                    id="description"
                    label="Description"
                    placeholder="Enter a description"
                    [control]="form.controls.description"
                />
                <ngx-clib-list-input
                    id="tags"
                    label="Tags"
                    placeholder="Add a tag"
                    [control]="form.controls.tags"
                />
                <ngx-clib-markdown-input
                    id="recipe"
                    label="Recipe"
                    placeholder="Enter a recipe"
                    [control]="form.controls.recipe"
                />
            </form>
        </div>
        <div
            class="sticky bottom-0 flex flex-row-reverse justify-between bg-base-100 pt-4 pb-4 pr-6 pl-6 gap-4"
        >
            <ngx-clib-button
                [label]="actionLabel"
                [size]="'sm'"
                theme="neutral"
                (clickEvent)="submitEvent.emit()"
            />
            <ngx-clib-button
                label="Close"
                [size]="'sm'"
                theme="ghost"
                (clickEvent)="closeEvent.emit()"
            />
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemFormViewComponent {
    @Input({ required: true }) form!: FormGroup<ProductItemForm>;
    @Input({ required: true }) categoryOptions: SelectOption[] = [];
    @Input({ required: true }) title = '';
    @Input({ required: true }) actionLabel = '';
    @Output() submitEvent = new EventEmitter<void>();
    @Output() closeEvent = new EventEmitter<void>();
}
