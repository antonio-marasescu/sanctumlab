import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileSettingsViewComponent } from '../views/profile-settings-view.component';

@Component({
    selector: 'ngx-profile-settings-container',
    standalone: true,
    imports: [ProfileSettingsViewComponent],
    template: `<ngx-profile-settings-view />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsContainerComponent {}
