import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { I18nPipe } from '../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-placeholder',
    imports: [I18nPipe],
    template: ` <div
        class="flex flex-col gap-2 justify-center items-center text-center bg-base-200 rounded-xl h-fit p-4 w-fit"
    >
        <h3 class="text-lg">
            {{ title | i18nTranslate }}
        </h3>
        <span class="text-sm">{{ label | i18nTranslate }}</span>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) label!: string;
}
