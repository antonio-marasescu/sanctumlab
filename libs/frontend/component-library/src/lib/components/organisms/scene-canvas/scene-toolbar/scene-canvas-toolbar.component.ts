import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'ngx-clib-scene-canvas-toolbar',
    imports: [NgIcon],
    standalone: true,
    template: `<ul class="menu menu-horizontal bg-base-200 box">
        <li>
            <div class="tooltip tooltip-bottom" data-tip="Add">
                <ng-icon name="matPlus" size="20" />
            </div>
        </li>
        <li>
            <div class="tooltip tooltip-bottom" data-tip="Background">
                <ng-icon name="matWallpaper" size="20" />
            </div>
        </li>
        <li>
            <div class="tooltip tooltip-bottom" data-tip="Select">
                <ng-icon name="matMouse" size="20" />
            </div>
        </li>
        <li>
            <div class="tooltip tooltip-bottom" data-tip="Lock">
                <ng-icon name="matLock" size="20" />
            </div>
        </li>
    </ul>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneCanvasToolbarComponent {}
