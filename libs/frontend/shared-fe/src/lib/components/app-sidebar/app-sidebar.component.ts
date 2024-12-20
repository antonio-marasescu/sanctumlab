import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    IconButtonComponent,
    SidebarCategoryItem,
    SidebarComponent,
    ThemeChangerComponent
} from '@sanctumlab/fe/component-library';
import { AppNavigationService } from '../../services/app-navigation.service';
import { AuthAvatarComponent } from '../auth-avatar/auth-avatar.component';
import { ThemingService } from '../../services/theming.service';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppQrCodeComponent } from '../app-qr-code/app-qr-code.component';

@UntilDestroy()
@Component({
    selector: 'ngx-shared-app-sidebar',
    imports: [
        SidebarComponent,
        AuthAvatarComponent,
        ThemeChangerComponent,
        IconButtonComponent,
        AppQrCodeComponent
    ],
    template: `
        <ngx-clib-sidebar
            [itemCategories]="appNavigationItems"
            [title]="appTitle"
            [logoUrl]="appLogoUrl"
            (navigate)="onNavigate($event)"
            (navigateHome)="onNavigateHome()"
        >
            <div menu-content class="flex gap-1 mx-2">
                <ngx-clib-icon-button
                    icon="matQrCode"
                    [size]="'sm'"
                    [iconSize]="20"
                    theme="ghost"
                    (clickEvent)="onOpenModal()"
                />
                <ngx-clib-theme-changer [control]="themeControl" />
            </div>
            <ng-container avatar>
                <ngx-shared-auth-avatar />
            </ng-container>
            <ng-container content>
                <ng-content></ng-content>
            </ng-container>
        </ngx-clib-sidebar>
        <ngx-shared-app-qr-code
            [modalOpened]="modalOpened"
            (modalClose)="onCloseModal()"
        />
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarComponent implements OnInit {
    protected readonly appLogoUrl = `assets/logo-bg.png`;
    protected readonly appTitle = `Sanctum Lab`;
    protected readonly appNavigationItems: SidebarCategoryItem[] = [
        {
            id: 'menus',
            label: 'shared:sidebar.actions.menus',
            items: [
                {
                    id: 'cocktails',
                    icon: 'matLocalBar',
                    label: 'shared:sidebar.actions.cocktails'
                },
                {
                    id: 'snacks',
                    icon: 'matFastfood',
                    label: 'shared:sidebar.actions.snacks'
                }
            ]
        }
    ];
    protected modalOpened = false;
    protected themeControl!: FormControl<boolean>;

    constructor(
        private readonly appNavigationService: AppNavigationService,
        private readonly themingService: ThemingService
    ) {}

    ngOnInit() {
        const isDarkMode = this.themingService.isDarkMode();
        const isNoThemeSelected = this.themingService.isNoThemeSelected();

        const initialTheme = isNoThemeSelected ? true : isDarkMode;
        this.themeControl = new FormControl<boolean>(initialTheme, {
            nonNullable: true
        });

        this.themeControl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(switchValue => {
                if (switchValue) {
                    this.themingService.toggleDarkMode();
                } else {
                    this.themingService.toggleLightMode();
                }
            });
    }

    protected async onNavigate(id: string): Promise<void> {
        if (id === 'cocktails') {
            await this.appNavigationService.navigateToMenuCocktails();
        }
        if (id === 'snacks') {
            await this.appNavigationService.navigateToMenuSnacks();
        }
    }

    protected async onNavigateHome(): Promise<void> {
        await this.appNavigationService.navigateToMenuFeature();
    }

    protected onOpenModal(): void {
        this.modalOpened = true;
    }

    protected onCloseModal(): void {
        this.modalOpened = false;
    }
}
