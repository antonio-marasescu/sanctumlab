import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    ButtonComponent,
    LogoComponent
} from '@sanctumlab/fe/component-library';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-auth-unauthorized-page',
    standalone: true,
    imports: [LogoComponent, ButtonComponent],
    template: ` <div
        class="flex flex-col gap-2 h-screen w-screen justify-center items-center"
    >
        <ngx-clib-logo
            logoUrl="assets/logo-bg.png"
            title="Sanctum Lab"
            size="md"
        />
        <div class="p-2 text-center">
            You are not authorized to access this resource
        </div>
        <ngx-clib-button
            label="Back"
            theme="ghost"
            [size]="'sm'"
            (clickEvent)="onBack()"
        />
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedPageComponent {
    constructor(private router: Router) {}

    protected async onBack(): Promise<void> {
        await this.router.navigate(['/']);
    }
}
