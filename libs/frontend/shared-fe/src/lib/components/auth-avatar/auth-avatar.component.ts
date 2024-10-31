import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    MenuAvatarComponent,
    MenuItem,
    ThemeChangerComponent,
    ToggleInputComponent
} from '@sanctumlab/fe/component-library';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
    AuthenticationService,
    selectAuthStateCurrentUser
} from '@sanctumlab/fe/auth-fe';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ngx-shared-auth-avatar',
    standalone: true,
    imports: [
        ToggleInputComponent,
        MenuAvatarComponent,
        ThemeChangerComponent,
        AsyncPipe
    ],
    template: ` <ngx-clib-menu-avatar
        [size]="'xs'"
        [isPlaceholder]="true"
        [placeholder]="(username$ | async) || ''"
        [items]="items"
        [rightSide]="true"
        (menuClick)="onMenuClick($event)"
    >
    </ngx-clib-menu-avatar>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthAvatarComponent implements OnInit {
    protected username$!: Observable<string>;

    protected readonly items: MenuItem[] = [
        { id: 'settings', label: 'Settings' },
        { id: 'sign-out', label: 'Sign Out' }
    ];

    constructor(
        private authService: AuthenticationService,
        private store: Store
    ) {}

    ngOnInit() {
        this.username$ = this.store
            .select(selectAuthStateCurrentUser())
            .pipe(map(user => user?.username?.slice(0, 2) || ''));
    }

    protected async onMenuClick(id: string): Promise<void> {
        if (id === 'sign-out') {
            await this.authService.signOut();
        }
    }
}
