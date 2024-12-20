import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent } from '@sanctumlab/fe/shared';

@Component({
    selector: 'ngx-menu-root',
    imports: [RouterOutlet, AppSidebarComponent],
    template: `<ngx-shared-app-sidebar
        ><router-outlet></router-outlet
    ></ngx-shared-app-sidebar>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuRootComponent {}
