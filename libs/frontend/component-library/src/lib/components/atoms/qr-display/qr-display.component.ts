import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
    selector: 'ngx-clib-qr-display',
    imports: [QRCodeComponent],
    template: `
        <div class="flex flex-col gap-1 items-center align-middle">
            @if (!isResponsive()) {
                <qrcode
                    [margin]="margin()"
                    [qrdata]="data()"
                    [ariaLabel]="data()"
                    [width]="width()"
                    [errorCorrectionLevel]="errorLevel()"
                ></qrcode>
            } @else {
                <qrcode
                    class="hidden sm:block"
                    [margin]="margin()"
                    [qrdata]="data()"
                    [width]="512"
                    [errorCorrectionLevel]="errorLevel()"
                ></qrcode>
                <qrcode
                    class="block sm:hidden"
                    [margin]="margin()"
                    [qrdata]="data()"
                    [width]="256"
                    [errorCorrectionLevel]="errorLevel()"
                ></qrcode>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QRDisplayComponent {
    public data = input.required<string>();
    public isResponsive = input<boolean>(false);
    public width = input<number>(256);
    public margin = input<number>(2);
    public errorLevel = input<'L' | 'M' | 'Q' | 'H'>('Q');
}
