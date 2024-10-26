import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ComponentSize } from '../../../types/shared/theme.types';

@Component({
    selector: 'ngx-clib-logo',
    standalone: true,
    imports: [NgClass],
    template: ` <div class="flex">
        @if (!isResponsive) {
            <img
                [src]="logoUrl"
                class="me-3 cursor-pointer hover:opacity-85"
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
                class="h-6 sm:h-8 me-2 sm:me-3 cursor-pointer hover:opacity-85"
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
}
