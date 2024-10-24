import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ngx-clib-logo',
    standalone: true,
    imports: [NgClass],
    template: ` <div class="flex ms-2 md:me-24">
        <img
            [src]="logoUrl"
            class="h-8 me-3 cursor-pointer hover:opacity-85"
            [ngClass]="{
                'h-8': size === 'md',
                'h-12': size === 'lg',
                'h-24': size === 'xl'
            }"
            [alt]="title"
        />
        @if (useTitle) {
            <span
                class="self-center text-xl text-neutral font-semibold sm:text-2xl whitespace-nowrap"
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
    @Input({ required: false }) size: 'md' | 'lg' | 'xl' = 'md';
}
