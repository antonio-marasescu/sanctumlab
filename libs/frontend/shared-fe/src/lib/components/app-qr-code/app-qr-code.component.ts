import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {
    ModalComponent,
    QRDisplayComponent,
    TextInputComponent
} from '@sanctumlab/fe/component-library';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ngx-shared-app-qr-code',
    imports: [
        ModalComponent,
        QRDisplayComponent,
        TextInputComponent,
        AsyncPipe
    ],
    template: ` <ngx-clib-modal
        [opened]="modalOpened"
        [positionBottom]="false"
        [hasActions]="false"
        (closeEvent)="modalClose.emit()"
    >
        <div content class="flex flex-col gap-4 items-center">
            <div class="w-[256px] sm:w-full">
                <ngx-clib-text-input
                    [control]="codeControl"
                    id="qr-code-control"
                    label="shared:sidebar.qr.code"
                    type="password"
                    placeholder="••••••••"
                />
            </div>
            <ngx-clib-qr-display
                [data]="(qrCode$ | async) || ''"
                [isResponsive]="true"
            />
        </div>
    </ngx-clib-modal>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppQrCodeComponent implements OnInit {
    @Input({ required: true }) modalOpened = false;
    @Output() modalClose = new EventEmitter<void>();
    protected readonly protocol = window.location.protocol;
    protected readonly hostname = window.location.hostname;
    protected qrCode$!: Observable<string>;
    protected codeControl!: FormControl<string>;

    ngOnInit() {
        this.codeControl = new FormControl<string>('', {
            nonNullable: true,
            validators: []
        });
        this.qrCode$ = this.codeControl.valueChanges.pipe(
            startWith(''),
            map(value =>
                value
                    ? `${this.protocol}//${this.hostname}?code=${value}`
                    : `${this.protocol}//${this.hostname}`
            )
        );
    }
}
