import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'ngx-clib-menu-card',
    standalone: true,
    imports: [NgOptimizedImage],
    template: ` <div
        class="max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700"
    >
        @if (imageUrl) {
            <a href="#">
                <img class="rounded-t-lg" [src]="imageUrl" [alt]="title" />
            </a>
        }
        <div class="p-5">
            <a href="#">
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    {{ title }}
                </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {{ description }}
            </p>
        </div>
    </div>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCardComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) title!: string;
    @Input({ required: true }) description!: string;
    @Input({ required: false }) imageUrl!: string;
}
