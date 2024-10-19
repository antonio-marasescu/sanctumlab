import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuListViewComponent } from '../views/menu-list-view.component';
import { MenuApiService } from '@sanctumlab/fe/data-access';
import { Observable } from 'rxjs';
import { MenuItem, MenuItemType } from '@sanctumlab/api-interfaces';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ngx-menu-list-container',
    standalone: true,
    imports: [MenuListViewComponent, AsyncPipe],
    template: `<ngx-menu-list-view [items]="items$ | async" />`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListContainerComponent implements OnInit {
    protected items$!: Observable<MenuItem[]>;

    constructor(private menuApiService: MenuApiService) {}

    ngOnInit() {
        this.items$ = this.menuApiService.retrieveMenuStream(
            MenuItemType.Cocktail
        );
    }
}
