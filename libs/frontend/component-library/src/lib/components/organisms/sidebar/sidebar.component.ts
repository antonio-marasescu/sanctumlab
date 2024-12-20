import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { SidebarCategoryItem } from '../../../types/organisms/sidebar.types';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconButtonComponent } from '../../atoms/icon-button/icon-button.component';
import { I18nPipe } from '../../../pipes/i18n.pipe';

@Component({
    selector: 'ngx-clib-sidebar',
    imports: [
        NgIcon,
        LogoComponent,
        ReactiveFormsModule,
        IconButtonComponent,
        I18nPipe
    ],
    templateUrl: 'sidebar.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    @Input({ required: true }) logoUrl!: string;
    @Input({ required: true }) title!: string;
    @Input({ required: true }) itemCategories: SidebarCategoryItem[] = [];
    @Output() navigate = new EventEmitter<string>();
    @Output() navigateHome = new EventEmitter<void>();

    protected readonly sidebarControl = new FormControl<boolean>(false, {
        nonNullable: true
    });

    protected onNavigate(id: string): void {
        this.navigate.emit(id);
        this.sidebarControl.setValue(false);
    }

    protected onNavigateHome(): void {
        this.navigateHome.emit();
        this.sidebarControl.setValue(false);
    }

    protected onCloseSidebar(): void {
        this.sidebarControl.setValue(false);
    }
}
