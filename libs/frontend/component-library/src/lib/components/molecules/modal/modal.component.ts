import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { NgClass } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-modal',
    standalone: true,
    imports: [NgClass],
    template: `
        <dialog
            #modal
            id="active-modal"
            class="modal"
            [ngClass]="{ 'modal-bottom': positionBottom }"
        >
            <div class="modal-box">
                <ng-content select="[content]"></ng-content>
                @if (hasActions) {
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
export class ModalComponent implements OnChanges, AfterViewInit {
    @Input({ required: true }) positionBottom = false;
    @Input({ required: true }) opened = false;
    @Input({ required: false }) hasActions = true;
    @Output() closeEvent = new EventEmitter<void>();
    @ViewChild('modal')
    private readonly modal?: ElementRef<HTMLDialogElement>;

    ngAfterViewInit() {
        if (this.opened) {
            this.openModal();
        }
        if (this.modal?.nativeElement) {
            fromEvent(this.modal.nativeElement, 'close')
                .pipe(untilDestroyed(this))
                .subscribe(() => this.closeEvent.emit());
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['opened']?.firstChange ||
            changes['opened']?.previousValue !== changes['opened'].currentValue
        ) {
            const isOpened = changes['opened'].currentValue;
            if (isOpened) {
                this.openModal();
            } else {
                this.closeModal();
            }
        }
    }

    protected openModal(): void {
        this.modal?.nativeElement.showModal();
    }

    protected closeModal(): void {
        this.modal?.nativeElement.close();
    }
}
