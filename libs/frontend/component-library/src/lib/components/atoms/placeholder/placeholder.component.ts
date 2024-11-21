import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { I18NextModule } from 'angular-i18next';

@Component({
    selector: 'ngx-clib-placeholder',
    standalone: true,
    imports: [I18NextModule],
    template: ` <div
        class="flex flex-col gap-2 justify-center items-center text-center bg-base-200 rounded-xl h-fit p-4 w-fit"
    >
        <h3 class="text-lg">
            {{ title | i18nextEager }}
        </h3>
        <span class="text-sm">{{ label | i18nextEager }}</span>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) label!: string;
}
