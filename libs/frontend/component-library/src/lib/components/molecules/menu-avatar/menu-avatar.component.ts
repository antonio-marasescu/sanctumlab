import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output
} from '@angular/core';
import { ComponentSize } from '../../../types/shared/theme.types';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { NgClass } from '@angular/common';
import { MenuItem } from '../../../types/molecules/menu.types';
import { I18NextModule } from 'angular-i18next';

@Component({
    selector: 'ngx-clib-menu-avatar',
    standalone: true,
    imports: [AvatarComponent, NgClass, I18NextModule],
    template: `
        <div class="w-full">
            <div class="relative w-fit">
                <ngx-clib-avatar
                    [isPlaceholder]="isPlaceholder"
                    [placeholder]="placeholder"
                    [url]="url"
                    [size]="size"
                    [isCircle]="isCircle"
                    [interactable]="true"
                    (click)="onAvatarClicked()"
                />
                @if (menuActive) {
                    <div
                        class="absolute mt-2 z-50"
                        [ngClass]="{
                            'right-2': rightSide,
                            'left-2': !rightSide
                        }"
                    >
                        <ul
                            class="menu menu-md bg-base-200 rounded-box w-32 md:w-44 dark:shadow-neutral dark:shadow-sm"
                        >
                            @for (item of items; track item.id) {
                                <li
                                    [id]="item.id"
                                    (click)="onMenuClick(item.id)"
                                >
                                    <span>{{ item.label | i18nextEager }}</span>
                                </li>
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuAvatarComponent {
    @Input({ required: true }) isPlaceholder = false;
    @Input({ required: true }) items: MenuItem[] = [];
    @Input({ required: false }) placeholder = '';
    @Input({ required: false }) url = '';
    @Input({ required: false }) size: ComponentSize = 'md';
    @Input({ required: false }) isCircle = true;
    @Input({ required: false }) rightSide = false;
    @Output() menuClick = new EventEmitter<string>();

    constructor(private readonly elementRef: ElementRef) {}

    protected menuActive = false;

    protected onAvatarClicked(): void {
        this.menuActive = !this.menuActive;
    }

    protected onMenuClick(id: string): void {
        this.menuActive = false;
        this.menuClick.emit(id);
    }

    @HostListener('document:click', ['$event'])
    protected handleClickEvent(event: Event): void {
        if (
            this.menuActive &&
            !this.elementRef.nativeElement.contains(event.target as Node)
        ) {
            this.menuActive = false;
        }
    }
}
