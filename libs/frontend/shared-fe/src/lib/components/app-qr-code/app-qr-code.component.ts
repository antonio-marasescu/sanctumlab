import {
    ChangeDetectionStrategy,
    Component,
    EnvironmentInjector,
    input,
    OnInit,
    output,
    Signal
} from '@angular/core';
import {
    ModalComponent,
    QRDisplayComponent,
    TextInputComponent
} from '@sanctumlab/fe/component-library';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ngx-shared-app-qr-code',
    imports: [ModalComponent, QRDisplayComponent, TextInputComponent],
    template: ` <ngx-clib-modal
        [opened]="modalOpened()"
        [positionBottom]="false"
        [hasActions]="false"
        (closeEvent)="modalClose.emit()"
    >
        <div content class="flex flex-col gap-4 items-center">
            <form class="w-[256px] sm:w-full">
                <ngx-clib-text-input
                    [control]="codeControl"
                    [translatePlaceholder]="false"
                    id="qr-code-control"
                    label="shared:sidebar.qr.code"
                    type="password"
                    placeholder="••••••••"
                />
            </form>
            <ngx-clib-qr-display
                [data]="qrCode() || ''"
                [isResponsive]="true"
            />
        </div>
    </ngx-clib-modal>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppQrCodeComponent implements OnInit {
    public modalOpened = input<boolean>(false);
    public modalClose = output<void>();
    protected readonly protocol = window.location.protocol;
    protected readonly hostname = window.location.hostname;
    protected codeControl!: FormControl<string>;
    protected qrCode!: Signal<string>;

    constructor(private readonly injector: EnvironmentInjector) {}

    ngOnInit() {
        this.codeControl = new FormControl<string>('', {
            nonNullable: true,
            validators: []
        });
        this.qrCode = toSignal(
            this.codeControl.valueChanges.pipe(
                startWith(''),
                map(value =>
                    value
                        ? `${this.protocol}//${this.hostname}?code=${value}`
                        : `${this.protocol}//${this.hostname}`
                )
            ),
            { initialValue: '', injector: this.injector }
        );
    }
}
