import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { SidebarItem } from '../../../types/molecules/sidebar.types';
import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
    selector: 'ngx-clib-sidebar',
    standalone: true,
    imports: [NgIcon, LogoComponent],
    templateUrl: 'sidebar.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    @Input({ required: true }) logoUrl!: string;
    @Input({ required: true }) title!: string;
    @Input({ required: true }) items: SidebarItem[] = [];
    @Output() navigate = new EventEmitter<string>();
    @Output() navigateHome = new EventEmitter<void>();
}
