import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ComponentSize } from '../../../types/shared/theme.types';

@Component({
    selector: 'ngx-clib-logo',
    imports: [NgClass],
    template: ` <div
        class="flex"
        [ngClass]="{ 'hover:opacity-85 cursor-pointer': interactable() }"
        (click)="onClickEvent()"
    >
        @if (!isResponsive()) {
            <img
                [src]="logoUrl()"
                class="me-3"
                [ngClass]="{
                    'h-4': size() === 'xs',
                    'h-6': size() === 'sm',
                    'h-8': size() === 'md',
                    'h-12': size() === 'lg',
                    'h-24': size() === 'xl'
                }"
                [alt]="title()"
            />
        } @else {
            <img
                [src]="logoUrl()"
                class="h-8 sm:h-10 me-2 sm:me-3"
                [alt]="title()"
            />
        }
        @if (useTitle()) {
            <span
                class="self-center text-sm text-base-content font-semibold sm:text-xl lg:text-2xl whitespace-nowrap"
                >{{ title() }}</span
            >
        }
    </div>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
    public logoUrl = input.required<string>();
    public title = input.required<string>();
    public useTitle = input<boolean>(true);
    public size = input<ComponentSize>('md');
    public isResponsive = input<boolean>(false);
    public interactable = input<boolean>(false);
    public clickEvent = output<void>();

    protected onClickEvent(): void {
        if (this.interactable()) {
            this.clickEvent.emit();
        }
    }
}
