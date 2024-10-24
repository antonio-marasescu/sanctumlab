import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToggleInputComponent } from '@sanctumlab/fe/component-library';
import { FormControl } from '@angular/forms';
import { ThemingService } from '../../services/theming.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '@sanctumlab/fe/auth';

@UntilDestroy()
@Component({
    selector: 'ngx-shared-auth-avatar',
    standalone: true,
    imports: [ToggleInputComponent],
    template: ` <div>
            <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
            >
                <span class="sr-only">Open user menu</span>
                <img
                    class="w-8 h-8 rounded-full bg-gray-600"
                    [src]="placeholderAvatarUrl"
                    alt="User Avatar"
                />
            </button>
        </div>
        <div
            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown-user"
        >
            <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                    {{ username }}
                </p>
            </div>
            <ul class="py-1" role="none">
                <li>
                    <div
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                    >
                        <ngx-clib-toggle-input
                            [label]="themeControlLabel"
                            [control]="themeControl"
                        />
                    </div>
                </li>
                @if (!isGuest) {
                    <li>
                        <div
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            role="menuitem"
                        >
                            Settings
                        </div>
                    </li>
                }
                <li>
                    <div
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        role="menuitem"
                        (click)="signOut()"
                    >
                        Sign out
                    </div>
                </li>
            </ul>
        </div>`,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthAvatarComponent implements OnInit {
    protected username?: string = 'Guest';
    protected isGuest = false;
    protected placeholderAvatarUrl = 'assets/guest-avatar.svg';
    protected themeControl!: FormControl<boolean>;
    protected themeControlLabel!: string;

    constructor(
        private themingService: ThemingService,
        private authService: AuthenticationService
    ) {}

    ngOnInit() {
        const isDarkMode = this.themingService.isDarkMode();
        this.themeControl = new FormControl<boolean>(isDarkMode, {
            nonNullable: true
        });
        this.themeControlLabel = this.getThemeControlLabel();

        this.themeControl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(switchValue => {
                if (switchValue) {
                    this.themingService.toggleDarkMode();
                } else {
                    this.themingService.toggleLightMode();
                }
                this.themeControlLabel = this.getThemeControlLabel();
            });
    }

    private getThemeControlLabel(): string {
        return this.themeControl.value ? 'Dark' : 'Light';
    }

    protected async signOut(): Promise<void> {
        await this.authService.signOut();
    }
}
