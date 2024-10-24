import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@Component({
    standalone: true,
    imports: [RouterModule, AmplifyAuthenticatorModule],
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    styleUrls: []
})
export class AppComponent {}
