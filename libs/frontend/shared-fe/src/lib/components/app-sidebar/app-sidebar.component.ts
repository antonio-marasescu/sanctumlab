import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '@sanctumlab/fe/component-library';
import { AppNavigationService } from '../../services/app-navigation.service';
import { AppFeatureRoutes } from '../../types/app-routes.types';
import { AuthAvatarComponent } from '../auth-avatar/auth-avatar.component';

@Component({
    selector: 'ngx-shared-app-sidebar',
    standalone: true,
    imports: [SidebarComponent, AuthAvatarComponent],
    template: `<ngx-clib-sidebar
        [items]="appNavigationItems"
        [title]="appTitle"
        [logoUrl]="appLogoUrl"
        (navigate)="onNavigate($event)"
        (navigateHome)="onNavigateHome()"
    >
        <ng-container avatar><ngx-shared-auth-avatar /></ng-container>
        <ng-container content><ng-content></ng-content></ng-container
    ></ngx-clib-sidebar>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarComponent {
    protected readonly appLogoUrl = `assets/logo-bg.png`;
    protected readonly appTitle = `Sanctum Lab`;
    protected readonly appNavigationItems = [
        {
            id: 'nav-cocktail-menu',
            icon: 'matLocalBar',
            label: 'Cocktails Menu'
        }
    ];

    constructor(private appNavigationService: AppNavigationService) {}

    protected async onNavigate(id: string): Promise<void> {
        if (id === AppFeatureRoutes.MENU) {
            await this.appNavigationService.navigateToMenuFeature();
        }
    }

    protected async onNavigateHome(): Promise<void> {
        await this.appNavigationService.navigateToMenuFeature();
    }
}
