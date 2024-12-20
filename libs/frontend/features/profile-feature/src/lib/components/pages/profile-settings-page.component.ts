import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileSettingsContainerComponent } from '../containers/profile-settings-container.component';

@Component({
    selector: 'ngx-profile-settings-page',
    imports: [ProfileSettingsContainerComponent],
    template: `<ngx-profile-settings-container />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsPageComponent {}
