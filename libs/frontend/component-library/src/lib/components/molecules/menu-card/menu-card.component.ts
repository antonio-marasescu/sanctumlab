import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { NgClass, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ComponentTheme } from '../../../types/shared/theme.types';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'ngx-clib-menu-card',
    standalone: true,
    imports: [NgOptimizedImage, NgClass, NgTemplateOutlet, NgIcon],
    template: `
        @if (hasIndicator) {
            <div class="indicator">
                <span
                    class="indicator-item indicator-bottom indicator-center badge text-xs font-semibold cursor-pointer hover:opacity-85"
                    [ngClass]="{
                        'badge-primary text-primary-content':
                            indicatorTheme === 'primary',
                        'badge-secondary text-secondary-content':
                            indicatorTheme === 'secondary',
                        'badge-accent text-accent-content':
                            indicatorTheme === 'accent',
                        'badge-neutral text-neutral-content':
                            indicatorTheme === 'neutral',
                        'badge-info text-info-content':
                            indicatorTheme === 'info',
                        'badge-success text-success-content':
                            indicatorTheme === 'success',
                        'badge-error text-error-content':
                            indicatorTheme === 'error'
                    }"
                    >{{ indicator.toUpperCase() }}</span
                >
                <ng-container *ngTemplateOutlet="card"></ng-container>
            </div>
        } @else {
            <ng-container *ngTemplateOutlet="card"></ng-container>
        }
        <ng-template #card>
            <div
                [id]="id"
                class="card bg-base-100 w-64 lg:w-96 isolate aspect-video shadow-xl ring-1 ring-black/5 hover:bg-base-200 cursor-pointer"
                (click)="cardClick.emit(id)"
            >
                <div class="card-body">
                    <h2 class="card-title">{{ title.toUpperCase() }}</h2>
                    <p>
                        {{ description }}
                    </p>
                    <div class="card-actions pt-2">
                        <div class="badge badge-outline">Tequila</div>
                        <div class="badge badge-outline">Rum</div>
                        <div class="badge badge-outline">Rum</div>
                        <div class="badge badge-outline">Rum</div>
                    </div>
                </div>
            </div>
        </ng-template>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCardComponent {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) title!: string;
    @Input({ required: true }) description!: string;
    @Input({ required: false }) hasIndicator = false;
    @Input({ required: false }) indicatorTheme: ComponentTheme = 'primary';
    @Input({ required: false }) indicator!: string;
    @Output() cardClick = new EventEmitter<string>();
}
