import {
    ChangeDetectionStrategy,
    Component,
    EnvironmentInjector,
    OnInit,
    Signal
} from '@angular/core';
import {
    MenuAvatarComponent,
    MenuItem
} from '@sanctumlab/fe/component-library';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
    AuthenticationService,
    selectAuthStateCurrentUser
} from '@sanctumlab/fe/auth';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppNavigationService } from '../../services/app-navigation.service';
import { toSignal } from '@angular/core/rxjs-interop';

@UntilDestroy()
@Component({
    selector: 'ngx-shared-auth-avatar',
    imports: [MenuAvatarComponent],
    template: ` <ngx-clib-menu-avatar
        [size]="'xs'"
        [isPlaceholder]="true"
        [placeholder]="username()"
        [items]="items"
        [rightSide]="true"
        (menuClick)="onMenuClick($event)"
    >
    </ngx-clib-menu-avatar>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthAvatarComponent implements OnInit {
    protected username!: Signal<string>;

    protected readonly items: MenuItem[] = [
        { id: 'settings', label: 'shared:avatar.actions.settings' },
        { id: 'sign-out', label: 'shared:avatar.actions.signOut' }
    ];

    constructor(
        private readonly authService: AuthenticationService,
        private readonly appNavigationService: AppNavigationService,
        private readonly store: Store,
        private readonly injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.username = toSignal(
            this.store
                .select(selectAuthStateCurrentUser())
                .pipe(map(user => user?.username?.slice(0, 2) ?? '')),
            { initialValue: '', injector: this.injector }
        );
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
