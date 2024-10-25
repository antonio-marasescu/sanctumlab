import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    SidebarCategoryItem,
    SidebarComponent,
    ThemeChangerComponent
} from '@sanctumlab/fe/component-library';
import { AppNavigationService } from '../../services/app-navigation.service';
import { AppFeatureRoutes } from '../../types/app-routes.types';
import { AuthAvatarComponent } from '../auth-avatar/auth-avatar.component';
import { ThemingService } from '../../services/theming.service';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'ngx-shared-app-sidebar',
    standalone: true,
    imports: [SidebarComponent, AuthAvatarComponent, ThemeChangerComponent],
    template: `<ngx-clib-sidebar
        [itemCategories]="appNavigationItems"
        [title]="appTitle"
        [logoUrl]="appLogoUrl"
        (navigate)="onNavigate($event)"
        (navigateHome)="onNavigateHome()"
    >
        <ngx-clib-theme-changer theme [control]="themeControl" />
        <ng-container avatar><ngx-shared-auth-avatar /></ng-container>
        <ng-container content><ng-content></ng-content></ng-container
    ></ngx-clib-sidebar>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarComponent implements OnInit {
    protected readonly appLogoUrl = `assets/logo-bg.png`;
    protected readonly appTitle = `Sanctum Lab`;
    protected readonly appNavigationItems: SidebarCategoryItem[] = [
        {
            id: 'menus',
            label: 'Menus',
            items: [
                {
                    id: 'cocktail',
                    icon: 'matLocalBar',
                    label: 'Cocktails'
                }
            ]
        }
    ];
    protected themeControl!: FormControl<boolean>;

    constructor(
        private appNavigationService: AppNavigationService,
        private themingService: ThemingService
    ) {}

    ngOnInit() {
        const isDarkMode = this.themingService.isDarkMode();

        this.themeControl = new FormControl<boolean>(isDarkMode, {
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
        if (id === AppFeatureRoutes.MENU) {
            await this.appNavigationService.navigateToMenuFeature();
        }
    }

    protected async onNavigateHome(): Promise<void> {
        await this.appNavigationService.navigateToMenuFeature();
    }
}
