import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ComponentTheme } from '../../../types/shared/theme.types';
import { NgClass } from '@angular/common';
import { I18nPipe } from '../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-notification',
    imports: [NgIcon, NgClass, I18nPipe],
    template: `<div
        tabindex="-1"
        [id]="id()"
        role="alert"
        class="alert p-2 md:p-3 shadow-lg gap-2 md:gap-4 animate-pop"
        [ngClass]="{
            'alert-primary': theme() === 'primary',
            'alert-secondary': theme() === 'secondary',
            'alert-neutral': theme() === 'neutral',
            'alert-accent': theme() === 'accent',
            'alert-info': theme() === 'info',
            'alert-error': theme() === 'error',
            'alert-success': theme() === 'success'
        }"
    >
        @if (icon()) {
            <ng-icon [name]="icon()" size="24" />
        }
        <div>
            <h2 class="font-bold">{{ label() | i18nTranslate }}</h2>
            @if (description()) {
                <div class="text-xs">{{ description() | i18nTranslate }}</div>
            }
        </div>
        <button class="btn btn-xs btn-ghost" (click)="closeEvent.emit(id())">
            {{ closeLabel() }}
        </button>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
    public id = input.required<string>();
    public label = input.required<string>();
    public icon = input.required<string>();
    public description = input.required<string>();
    public theme =
        input<Omit<ComponentTheme, 'primary' | 'secondary' | 'accent'>>('info');
    public closeLabel = input<string>('Close');
    public closeEvent = output<string>();
}
