import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentSize } from '../../../types/shared/theme.types';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ngx-clib-avatar',
    standalone: true,
    imports: [NgClass],
    template: `
        <div
            class="avatar"
            [ngClass]="{
                placeholder: isPlaceholder,
                'cursor-pointer hover:opacity-85': interactable
            }"
        >
            <div
                class="bg-neutral text-neutral-content"
                [ngClass]="{
                    'w-8': size === 'xs',
                    'w-16': size === 'sm',
                    'w-20': size === 'md',
                    'w-32': size === 'lg',
                    'w-48': size === 'xl',
                    'rounded-full': isCircle
                }"
            >
                @if (isPlaceholder && placeholder) {
                    <span
                        class="cursor-pointer select-none"
                        [ngClass]="{
                            'text-xs': size === 'xs',
                            'text-sm': size === 'sm',
                            'text-md': size === 'md',
                            'text-lg': size === 'lg',
                            'text-xl': size === 'xl'
                        }"
                        >{{ placeholder }}</span
                    >
                } @else {
                    <img [src]="url" alt="Avatar Image" />
                }
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
    @Input({ required: true }) isPlaceholder = false;
    @Input({ required: false }) placeholder = '';
    @Input({ required: false }) url = '';
    @Input({ required: false }) size: ComponentSize = 'md';
    @Input({ required: false }) isCircle = true;
    @Input({ required: false }) interactable = true;
}
