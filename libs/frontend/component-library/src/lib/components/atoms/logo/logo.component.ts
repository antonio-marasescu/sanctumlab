import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-clib-logo',
    standalone: true,
    imports: [],
    template: ` <div class="flex ms-2 md:me-24 cursor-pointer">
        <img [src]="logoUrl" class="h-8 me-3" [alt]="title + ' Logo'" />
        <span
            class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
            >{{ title }}</span
        >
    </div>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
    @Input({ required: true }) logoUrl!: string;
    @Input({ required: true }) title!: string;
}
