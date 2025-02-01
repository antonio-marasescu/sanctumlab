import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgClass } from '@angular/common';
import {
    ComponentSize,
    ComponentTheme
} from '../../../types/shared/theme.types';

@Component({
    selector: `ngx-clib-icon-button`,
    imports: [NgIcon, NgClass],
    template: `<button
        tabindex="0"
        class="btn"
        [disabled]="disabled()"
        [ngClass]="{
            'btn-circle': isCircle(),
            'btn-square': !isCircle(),
            'btn-outline': isOutlined(),
            'btn-primary': theme() === 'primary',
            'btn-secondary': theme() === 'secondary',
            'btn-accent': theme() === 'accent',
            'btn-neutral': theme() === 'neutral',
            'btn-ghost': theme() === 'ghost',
            'btn-info': theme() === 'info',
            'btn-success': theme() === 'success',
            'btn-error': theme() === 'error',
            'btn-xs': size() === 'xs',
            'btn-sm': size() === 'sm',
            'btn-md': size() === 'md',
            'btn-lg': size() === 'lg'
        }"
        (click)="clickEvent.emit()"
        (keydown.enter)="clickEvent.emit()"
    >
        <ng-icon [name]="icon" [size]="iconSize.toString()"></ng-icon>
    </button>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
    icon = input.required<string>();
    theme = input<ComponentTheme | 'ghost'>('primary');
    size = input<Omit<ComponentSize, 'xl'>>('md');
    iconSize = input<number>(14);
    isCircle = input<boolean>(true);
    isOutlined = input<boolean>(false);
    disabled = input<boolean>(false);
    clickEvent = output<void>();
}
