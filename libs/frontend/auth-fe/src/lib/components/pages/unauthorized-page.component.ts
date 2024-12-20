import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    ButtonComponent,
    I18nPipe,
    LogoComponent
} from '@sanctumlab/fe/component-library';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-auth-unauthorized-page',
    imports: [LogoComponent, ButtonComponent, I18nPipe],
    template: ` <div
        class="flex flex-col gap-2 h-screen w-screen justify-center items-center"
    >
        <ngx-clib-logo
            logoUrl="assets/logo-bg.png"
            title="Sanctum Lab"
            size="md"
        />
        <div class="p-2 text-center">
            {{ 'auth:unauthorized.message' | i18nTranslate }}
        </div>
        <ngx-clib-button
            id="back-button"
            label="auth:unauthorized.actions.back"
            theme="ghost"
            [size]="'sm'"
            (clickEvent)="onBack()"
        />
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedPageComponent {
    constructor(private readonly router: Router) {}

    protected async onBack(): Promise<void> {
        await this.router.navigate(['/']);
    }
}
