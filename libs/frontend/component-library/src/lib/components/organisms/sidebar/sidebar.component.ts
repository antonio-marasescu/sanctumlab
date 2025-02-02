import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
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
    public logoUrl = input.required<string>();
    public title = input.required<string>();
    public itemCategories = input<SidebarCategoryItem[]>([]);
    public navigate = output<string>();
    public navigateHome = output<void>();

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
