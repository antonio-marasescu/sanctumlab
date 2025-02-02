import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ComponentTheme } from '../../../types/shared/theme.types';
import { I18nPipe } from '../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-item-card',
    imports: [NgClass, NgTemplateOutlet, I18nPipe],
    template: `
        @if (hasIndicator()) {
            <div
                class="indicator w-full h-full max-w-64 sm:max-w-64 lg:max-w-96"
            >
                <span
                    class="indicator-item indicator-bottom indicator-center badge text-xs font-semibold cursor-pointer hover:opacity-85"
                    [ngClass]="{
                        'badge-primary text-primary-content':
                            indicatorTheme() === 'primary',
                        'badge-secondary text-secondary-content':
                            indicatorTheme() === 'secondary',
                        'badge-accent text-accent-content':
                            indicatorTheme() === 'accent',
                        'badge-neutral text-neutral-content':
                            indicatorTheme() === 'neutral',
                        'badge-info text-info-content':
                            indicatorTheme() === 'info',
                        'badge-success text-success-content':
                            indicatorTheme() === 'success',
                        'badge-error text-error-content':
                            indicatorTheme() === 'error'
                    }"
                    >{{ indicator() | i18nTranslate }}</span
                >
                <ng-container *ngTemplateOutlet="card"></ng-container>
            </div>
        } @else {
            <ng-container *ngTemplateOutlet="card"></ng-container>
        }
        <ng-template #card>
            <div
                [id]="id()"
                class="card bg-base-100 w-full max-w-64 sm:max-w-64 lg:max-w-96 shadow-xl ring-1 ring-black/5 hover:bg-base-300 cursor-pointer dark:bg-base-200 dark:hover:bg-neutral dark:shadow-neutral
                 dark:shadow-sm"
                (click)="cardClick.emit(id())"
            >
                <div class="card-body">
                    <h2 class="card-title">{{ title().toUpperCase() }}</h2>
                    <div class="min-h-20 max-h-20">
                        <p class="line-clamp-3">
                            {{ description() }}
                        </p>
                    </div>
                    @if (tags()?.length > 0) {
                        <div class="card-actions pt-2">
                            @for (tag of tags(); track tag) {
                                <div class="badge badge-accent">{{ tag }}</div>
                            }
                        </div>
                    }
                </div>
            </div>
        </ng-template>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent {
    public id = input.required<string>();
    public title = input.required<string>();
    public description = input<string | undefined>();
    public hasIndicator = input<boolean>(false);
    public indicatorTheme = input<ComponentTheme>('primary');
    public indicator = input<string>('');
    public tags = input<string[]>([]);
    public cardClick = output<string>();
}
