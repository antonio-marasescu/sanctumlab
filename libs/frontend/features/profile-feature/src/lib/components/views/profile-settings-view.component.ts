import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectInputComponent } from '@sanctumlab/fe/component-library';

@Component({
    selector: 'ngx-profile-settings-view',
    standalone: true,
    imports: [SelectInputComponent],
    template: `<div>
        <h2>Settings Page</h2>
        <div></div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsViewComponent {}
