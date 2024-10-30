import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItemFormContainerComponent } from '../containers/menu-item-form-container.component';

@Component({
    selector: 'ngx-menu-item-create-page',
    standalone: true,
    imports: [MenuItemFormContainerComponent],
    template: `<ngx-menu-item-form-container
        [item]="null"
        title="Create Product"
        actionLabel="Create"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemCreatePageComponent {}
