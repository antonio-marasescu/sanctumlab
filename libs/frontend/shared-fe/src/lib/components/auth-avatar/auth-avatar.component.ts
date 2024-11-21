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
} from '@sanctumlab/fe/auth';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AppNavigationService } from '../../services/app-navigation.service';

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
        { id: 'settings', label: 'shared:avatar.actions.settings' },
        { id: 'sign-out', label: 'shared:avatar.actions.signOut' }
    ];

    constructor(
        private readonly authService: AuthenticationService,
        private readonly appNavigationService: AppNavigationService,
        private readonly store: Store
    ) {}

    ngOnInit() {
        this.username$ = this.store
            .select(selectAuthStateCurrentUser())
            .pipe(map(user => user?.username?.slice(0, 2) ?? ''));
    }

    protected async onMenuClick(id: string): Promise<void> {
        if (id === 'sign-out') {
            await this.authService.signOut();
            return;
        }
        if (id === 'settings') {
            await this.appNavigationService.navigateToProfileSettings();
            return;
        }
    }
}
