import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ngx-clib-loading-indicator',
    imports: [NgClass],
    template: `
        @if (isOverlay()) {
            <div
                class="fixed inset-0 flex items-center justify-center bg-base-300 bg-opacity-50 z-50"
            >
                <div role="status">
                    <span
                        class="loading loading-dots text-info"
                        [ngClass]="{
                            'loading-md': size() === 'md',
                            'loading-lg': size() === 'lg'
                        }"
                    ></span>
                    <span class="sr-only text-info">Loading...</span>
                </div>
            </div>
        } @else {
            <div
                class="flex items-center justify-center w-full h-24"
                role="status"
            >
                <span
                    class="loading loading-dots text-info"
                    [ngClass]="{
                        'loading-md': size() === 'md',
                        'loading-lg': size() === 'lg'
                    }"
                ></span>
                <span class="sr-only text-info">Loading...</span>
            </div>
        }
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent {
    public isOverlay = input<boolean>(false);
    public size = input<'md' | 'lg'>('md');
}
