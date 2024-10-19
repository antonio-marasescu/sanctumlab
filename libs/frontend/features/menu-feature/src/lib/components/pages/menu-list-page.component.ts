import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuListContainerComponent } from '../containers/menu-list-container.component';
import { AppSidebarComponent } from '@sanctumlab/fe/shared-fe';

@Component({
    selector: 'ngx-menu-list-page',
    standalone: true,
    imports: [MenuListContainerComponent, AppSidebarComponent],
    template: `<ngx-shared-app-sidebar
        ><ngx-menu-list-container
    /></ngx-shared-app-sidebar> `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListPageComponent {}
