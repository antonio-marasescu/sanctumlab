import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    effect,
    ElementRef,
    input,
    output,
    viewChild
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { NgClass } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-modal',
    imports: [NgClass],
    template: `
        <dialog
            #modal
            id="active-modal"
            class="modal"
            [ngClass]="{ 'modal-bottom': positionBottom() }"
        >
            <div class="modal-box">
                <ng-content select="[content]"></ng-content>
                @if (hasActions()) {
                    <div class="modal-action">
                        <ng-content select="[actions]"></ng-content>
                    </div>
                }
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements AfterViewInit {
    public positionBottom = input<boolean>(false);
    public opened = input<boolean>(false);
    public hasActions = input<boolean>(true);
    public closeEvent = output<void>();
    private readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');

    constructor() {
        effect(() => {
            if (this.opened()) {
                this.openModal();
            } else {
                this.closeModal();
            }
        });
    }

    ngAfterViewInit() {
        const modalRef = this.modal();
        if (modalRef?.nativeElement) {
            fromEvent(modalRef.nativeElement, 'close')
                .pipe(untilDestroyed(this))
                .subscribe(() => this.closeEvent.emit());
        }
    }

    protected openModal(): void {
        const modalRef = this.modal();
        if (modalRef?.nativeElement?.showModal) {
            modalRef.nativeElement.showModal();
        }
    }

    protected closeModal(): void {
        const modalRef = this.modal();
        if (modalRef?.nativeElement?.close) {
            modalRef.nativeElement.close();
        }
    }
}
