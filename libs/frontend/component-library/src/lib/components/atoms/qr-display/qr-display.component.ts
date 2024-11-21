import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ngx-clib-qr-display',
    standalone: true,
    imports: [QRCodeModule, AsyncPipe],
    template: `
        <div class="flex flex-col gap-1 items-center align-middle">
            @if (!isResponsive) {
                <qrcode
                    [margin]="margin"
                    [qrdata]="data"
                    [ariaLabel]="data"
                    [width]="width"
                    [errorCorrectionLevel]="errorLevel"
                ></qrcode>
            } @else {
                <qrcode
                    class="hidden sm:block"
                    [margin]="margin"
                    [qrdata]="data"
                    [width]="512"
                    [errorCorrectionLevel]="errorLevel"
                ></qrcode>
                <qrcode
                    class="block sm:hidden"
                    [margin]="margin"
                    [qrdata]="data"
                    [width]="256"
                    [errorCorrectionLevel]="errorLevel"
                ></qrcode>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QRDisplayComponent {
    @Input({ required: true }) data = '';
    @Input({ required: false }) isResponsive = false;
    @Input({ required: false }) width = 256;
    @Input({ required: false }) margin = 2;
    @Input({ required: false }) errorLevel: 'L' | 'M' | 'Q' | 'H' = 'Q';
}
