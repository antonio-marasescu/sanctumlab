import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    input,
    Input,
    output,
    Output
} from '@angular/core';
import { NgClass } from '@angular/common';
import {
    ComponentSize,
    ComponentTheme
} from '../../../types/shared/theme.types';
import { I18nPipe } from '../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-button',
    imports: [NgClass, I18nPipe],
    template: `
        @if (!isResponsive()) {
            <button
                tabindex="0"
                class="btn"
                [disabled]="disabled()"
                [ngClass]="{
                    'btn-primary': theme() === 'primary',
                    'btn-secondary': theme() === 'secondary',
                    'btn-accent': theme() === 'accent',
                    'btn-neutral': theme() === 'neutral',
                    'btn-info': theme() === 'info',
                    'btn-success': theme() === 'success',
                    'btn-error': theme() === 'error',
                    'btn-ghost': theme() === 'ghost',
                    'btn-active': isActive(),
                    'btn-outline': isOutlined(),
                    'btn-xs': size() === 'xs',
                    'btn-sm': size() === 'sm',
                    'btn-md': size() === 'md',
                    'btn-lg': size() === 'lg',
                    'w-full': isWide(),
                    'btn-circle': isCircle()
                }"
                (click)="clickEvent.emit()"
                (keydown.enter)="clickEvent.emit()"
            >
                {{ label() | i18nTranslate }}
            </button>
        } @else {
            <button
                tabindex="0"
                class="btn btn-sm md:btn-md"
                [disabled]="disabled()"
                [ngClass]="{
                    'btn-primary': theme() === 'primary',
                    'btn-secondary': theme() === 'secondary',
                    'btn-accent': theme() === 'accent',
                    'btn-neutral': theme() === 'neutral',
                    'btn-info': theme() === 'info',
                    'btn-success': theme() === 'success',
                    'btn-error': theme === 'error',
                    'btn-ghost': theme() === 'ghost',
                    'btn-active': isActive(),
                    'btn-outline': isOutlined(),
                    'w-full': isWide(),
                    'btn-circle': isCircle()
                }"
                (click)="clickEvent.emit()"
                (keydown.enter)="clickEvent.emit()"
            >
                {{ label() | i18nTranslate }}
            </button>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    public label = input.required<string>();
    public theme = input<ComponentTheme | 'ghost'>('primary');
    public size = input<Omit<ComponentSize, 'xl'>>('md');
    public isOutlined = input<boolean>(false);
    public isResponsive = input<boolean>(false);
    public isWide = input<boolean>(false);
    public isActive = input<boolean>(false);
    public isCircle = input<boolean>(false);
    public disabled = input<boolean>(false);
    public clickEvent = output<void>();
}
