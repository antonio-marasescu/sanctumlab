import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { NotificationsListContainerComponent } from '@sanctumlab/fe/notification-feature';

@Component({
    imports: [
        RouterModule,
        AmplifyAuthenticatorModule,
        NotificationsListContainerComponent
    ],
    selector: 'app-root',
    template: `<ngx-notifications-list-container />

        <router-outlet></router-outlet>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
