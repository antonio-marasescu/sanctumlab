import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ComponentTheme } from '../../../types/shared/theme.types';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ngx-clib-notification',
    standalone: true,
    imports: [NgIcon, NgClass],
    template: `<div
        [id]="id"
        role="alert"
        class="alert p-2 md:p-3 shadow-lg gap-2 md:gap-4 animate-pop"
        [ngClass]="{
            'alert-primary': theme === 'primary',
            'alert-secondary': theme === 'secondary',
            'alert-neutral': theme === 'neutral',
            'alert-accent': theme === 'accent',
            'alert-info': theme === 'info',
            'alert-error': theme === 'error',
            'alert-success': theme === 'success'
        }"
    >
        @if (icon) {
            <ng-icon [name]="icon" size="24" />
        }
        <div>
            <h2 class="font-bold">{{ label }}</h2>
            @if (description) {
                <div class="text-xs">{{ description }}</div>
            }
        </div>
        <button class="btn btn-xs btn-ghost" (click)="closeEvent.emit(id)">
            {{ closeLabel }}
        </button>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) icon!: string;
    @Input({ required: false }) theme: Omit<
        ComponentTheme,
        'primary' | 'secondary' | 'accent'
    > = 'info';
    @Input({ required: false }) closeLabel = 'Close';
    @Input({ required: false }) description!: string | undefined;
    @Output() closeEvent = new EventEmitter<string>();
}
