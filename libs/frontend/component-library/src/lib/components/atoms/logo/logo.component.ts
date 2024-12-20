import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ComponentSize } from '../../../types/shared/theme.types';

@Component({
    selector: 'ngx-clib-logo',
    imports: [NgClass],
    template: ` <div
        class="flex"
        [ngClass]="{ 'hover:opacity-85 cursor-pointer': interactable }"
        (click)="onClickEvent()"
    >
        @if (!isResponsive) {
            <img
                [src]="logoUrl"
                class="me-3"
                [ngClass]="{
                    'h-4': size === 'xs',
                    'h-6': size === 'sm',
                    'h-8': size === 'md',
                    'h-12': size === 'lg',
                    'h-24': size === 'xl'
                }"
                [alt]="title"
            />
        } @else {
            <img
                [src]="logoUrl"
                class="h-8 sm:h-10 me-2 sm:me-3"
                [alt]="title"
            />
        }
        @if (useTitle) {
            <span
                class="self-center text-sm text-base-content font-semibold sm:text-xl lg:text-2xl whitespace-nowrap"
                >{{ title }}</span
            >
        }
    </div>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
    @Input({ required: true }) logoUrl!: string;
    @Input({ required: true }) title!: string;
    @Input({ required: false }) useTitle = true;
    @Input({ required: false }) size: ComponentSize = 'md';
    @Input({ required: false }) isResponsive = false;
    @Input({ required: false }) interactable = false;
    @Output() clickEvent = new EventEmitter<void>();

    protected onClickEvent(): void {
        if (this.interactable) {
            this.clickEvent.emit();
        }
    }
}
