import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { NgClass } from '@angular/common';
import {
    ComponentSize,
    ComponentTheme
} from '../../../types/shared/theme.types';

@Component({
    selector: 'ngx-clib-button',
    imports: [NgClass],
    standalone: true,
    template: `
        @if (!isResponsive) {
            <button
                tabindex="0"
                class="btn"
                [disabled]="disabled"
                [ngClass]="{
                    'btn-primary': theme === 'primary',
                    'btn-secondary': theme === 'secondary',
                    'btn-accent': theme === 'accent',
                    'btn-neutral': theme === 'neutral',
                    'btn-info': theme === 'info',
                    'btn-success': theme === 'success',
                    'btn-error': theme === 'error',
                    'btn-ghost': theme === 'ghost',
                    'btn-active': isActive,
                    'btn-outline': isOutlined,
                    'btn-xs': size === 'xs',
                    'btn-sm': size === 'sm',
                    'btn-md': size === 'md',
                    'btn-lg': size === 'lg',
                    'w-full': isWide,
                    'btn-circle': isCircle
                }"
                (click)="clickEvent.emit()"
                (keydown.enter)="clickEvent.emit()"
            >
                {{ label }}
            </button>
        } @else {
            <button
                tabindex="0"
                class="btn btn-sm md:btn-md"
                [disabled]="disabled"
                [ngClass]="{
                    'btn-primary': theme === 'primary',
                    'btn-secondary': theme === 'secondary',
                    'btn-accent': theme === 'accent',
                    'btn-neutral': theme === 'neutral',
                    'btn-info': theme === 'info',
                    'btn-success': theme === 'success',
                    'btn-error': theme === 'error',
                    'btn-ghost': theme === 'ghost',
                    'btn-active': isActive,
                    'btn-outline': isOutlined,
                    'w-full': isWide,
                    'btn-circle': isCircle
                }"
                (click)="clickEvent.emit()"
                (keydown.enter)="clickEvent.emit()"
            >
                {{ label }}
            </button>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @Input({ required: true }) label!: string;
    @Input({ required: false }) theme: ComponentTheme | 'ghost' = 'primary';
    @Input({ required: false }) size: Omit<ComponentSize, 'xl'> = 'md';
    @Input({ required: false }) isOutlined = false;
    @Input({ required: false }) isResponsive = false;
    @Input({ required: false }) isWide = false;
    @Input({ required: false }) isActive = false;
    @Input({ required: false }) isCircle = false;
    @Input({ required: false }) disabled = false;
    @Output() clickEvent = new EventEmitter<void>();
}
