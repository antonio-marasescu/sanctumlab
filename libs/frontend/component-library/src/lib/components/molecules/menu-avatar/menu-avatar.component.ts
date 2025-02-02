import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    input,
    output,
    signal
} from '@angular/core';
import { ComponentSize } from '../../../types/shared/theme.types';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { NgClass } from '@angular/common';
import { MenuItem } from '../../../types/molecules/menu.types';
import { I18nPipe } from '../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-menu-avatar',
    imports: [AvatarComponent, NgClass, I18nPipe],
    template: `
        <div class="w-full">
            <div class="relative w-fit">
                <ngx-clib-avatar
                    [isPlaceholder]="isPlaceholder()"
                    [placeholder]="placeholder()"
                    [url]="url()"
                    [size]="size()"
                    [isCircle]="isCircle()"
                    [interactable]="true"
                    (click)="onAvatarClicked()"
                />
                @if (menuActive()) {
                    <div
                        class="absolute mt-2 z-50"
                        [ngClass]="{
                            'right-2': rightSide(),
                            'left-2': !rightSide()
                        }"
                    >
                        @if (items()?.length > 0) {
                            <ul
                                class="menu menu-md bg-base-200 rounded-box w-32 md:w-44 dark:shadow-neutral dark:shadow-sm"
                            >
                                @for (item of items(); track item.id) {
                                    <li
                                        [id]="item.id"
                                        (click)="onMenuClick(item.id)"
                                    >
                                        <span>{{
                                            item.label | i18nTranslate
                                        }}</span>
                                    </li>
                                }
                            </ul>
                        }
                    </div>
                }
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuAvatarComponent {
    public items = input.required<MenuItem[]>();
    public isPlaceholder = input<boolean>(false);
    public placeholder = input<string>('');
    public url = input<string>('');
    public size = input<ComponentSize>('md');
    public isCircle = input<boolean>(true);
    public rightSide = input<boolean>(false);
    public menuClick = output<string>();

    constructor(private readonly elementRef: ElementRef) {}

    protected menuActive = signal<boolean>(false);

    protected onAvatarClicked(): void {
        this.menuActive.set(!this.menuActive());
    }

    protected onMenuClick(id: string): void {
        this.menuActive.set(false);
        this.menuClick.emit(id);
    }

    @HostListener('document:click', ['$event'])
    protected handleClickEvent(event: Event): void {
        if (
            this.menuActive() &&
            !this.elementRef.nativeElement.contains(event.target as Node)
        ) {
            this.menuActive.set(false);
        }
    }
}
