import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
                    'btn-active': isActive,
                    'btn-outline': isOutlined,
                    'btn-xs': size === 'xs',
                    'btn-sm': size === 'sm',
                    'btn-md': size === 'md',
                    'btn-lg': size === 'lg',
                    'btn-xl': size === 'xl',
                    'btn-circle': isCircle
                }"
            >
                {{ label }}
            </button>
        } @else {
            <button
                class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                [disabled]="disabled"
                [ngClass]="{
                    'btn-primary': theme === 'primary',
                    'btn-secondary': theme === 'secondary',
                    'btn-accent': theme === 'accent',
                    'btn-neutral': theme === 'neutral',
                    'btn-info': theme === 'info',
                    'btn-success': theme === 'success',
                    'btn-error': theme === 'error',
                    'btn-active': isActive,
                    'btn-outline': isOutlined,
                    'btn-circle': isCircle
                }"
            >
                {{ label }}
            </button>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @Input({ required: true }) label!: string;
    @Input({ required: false }) theme: ComponentTheme = 'primary';
    @Input({ required: false }) size: Omit<ComponentSize, 'xl'> = 'md';
    @Input({ required: false }) isOutlined = false;
    @Input({ required: false }) isResponsive = false;
    @Input({ required: false }) isActive = false;
    @Input({ required: false }) isCircle = false;
    @Input({ required: false }) disabled = false;
}
