import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input
} from '@angular/core';
import { LibraryIcon } from '../../../types/iconography/iconography.types';
import { FormControl } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { NgClass } from '@angular/common';
import {
    ComponentSize,
    ComponentTheme
} from '../../../types/shared/theme.types';

@Component({
    selector: 'ngx-clib-icon-selector',
    imports: [NgIcon, NgClass],
    template: `
        @let selected = selectedOption();
        <div
            class="btn"
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
        >
            @if (selected) {
                <ng-icon [name]="selected.id" size="20" />
            } @else {
                <ng-icon name="matQuestionMark" size="20" />
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconSelectorComponent {
    public options = input<LibraryIcon[]>([]);
    public theme = input<ComponentTheme | 'ghost'>('neutral');
    public size = input<Omit<ComponentSize, 'xl'>>('sm');
    public iconSize = input<number>(14);
    public isCircle = input<boolean>(true);
    public isOutlined = input<boolean>(false);
    public disabled = input<boolean>(false);
    public control = input<FormControl<string | undefined>>();

    protected selectedOption = computed(() => {
        const controlValue = this.control()?.value;
        const optionsValue = this.options();
        if (!controlValue || !optionsValue) {
            return undefined;
        }
        return optionsValue.find(item => controlValue === item.id);
    });
}
