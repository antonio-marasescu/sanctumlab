import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import { LibraryIcon } from '../../../types/iconography/iconography.types';
import { NgIcon } from '@ng-icons/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ngx-clib-icon-library',
    imports: [NgIcon, NgClass],
    template: `<div
        class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center bg-base-100 p-4"
    >
        @for (option of options(); track option.id) {
            <div
                class="bg-base-200 flex flex-col justify-center items-center shadow-md p-2 "
                [ngClass]="{
                    'cursor-pointer hover:bg-base-300': isSelectable()
                }"
                (click)="onSelect(option.id)"
            >
                <div><ng-icon [name]="option.id" size="24" /></div>
                <div class="text-sm">{{ option.label }}</div>
            </div>
        }
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconLibraryComponent {
    public options = input<LibraryIcon[]>([]);
    public isSelectable = input<boolean>(true);
    public optionSelected = output<string>();

    protected onSelect(iconId: string): void {
        if (this.isSelectable()) {
            this.optionSelected.emit(iconId);
        }
    }
}
