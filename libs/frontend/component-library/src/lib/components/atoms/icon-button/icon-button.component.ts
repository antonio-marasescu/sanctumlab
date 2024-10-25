import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgClass } from '@angular/common';
import {
    ComponentSize,
    ComponentTheme
} from '../../../types/shared/theme.types';

@Component({
    selector: `ngx-clib-icon-button`,
    standalone: true,
    imports: [NgIcon, NgClass],
    template: `<button
        class="btn"
        [disabled]="disabled"
        [ngClass]="{
            'btn-circle': isCircle,
            'btn-square': !isCircle,
            'btn-outline': isOutlined,
            'btn-primary': theme === 'primary',
            'btn-secondary': theme === 'secondary',
            'btn-accent': theme === 'accent',
            'btn-neutral': theme === 'neutral',
            'btn-ghost': theme === 'ghost',
            'btn-info': theme === 'info',
            'btn-success': theme === 'success',
            'btn-error': theme === 'error',
            'btn-xs': size === 'xs',
            'btn-sm': size === 'sm',
            'btn-md': size === 'md',
            'btn-lg': size === 'lg'
        }"
    >
        <ng-icon [name]="icon" [size]="iconSize"></ng-icon>
    </button>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
    @Input({ required: true }) icon!: string;
    @Input({ required: false }) theme: ComponentTheme | 'ghost' = 'primary';
    @Input({ required: false }) size: Omit<ComponentSize, 'xl'> = 'md';
    @Input({ required: false }) isCircle = true;
    @Input({ required: false }) isOutlined = false;
    @Input({ required: false }) disabled = false;

    protected get iconSize(): string {
        switch (this.size) {
            case 'xs':
                return '12';
            case 'sm':
                return '14;';
            case 'lg':
                return '24';
            default:
                return '16';
        }
    }
}