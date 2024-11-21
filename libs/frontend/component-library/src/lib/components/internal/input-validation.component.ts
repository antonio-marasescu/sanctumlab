import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EnvironmentInjector,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    runInInjectionContext
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    InputState,
    InputStateType
} from '../../types/internal/input-internal.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { retrieveErrorMessage } from '../../utils/validation.utils';
import {
    InputValidationConfigToken,
    InputValidationConfiguration
} from '../../config/input-validation.config';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-input-validation',
    standalone: true,
    imports: [],
    template: `@if (controlState === InputState.Invalid && errorMessage) {
        <div class="label">
            <span class="label-text-alt text-error">{{ errorMessage }} </span>
        </div>
    }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputValidationComponent implements OnInit {
    @Input({ required: true }) control!: FormControl;
    @Output() controlStateChange = new EventEmitter<InputStateType>();

    protected readonly InputState = InputState;
    protected errorMessage = '';

    constructor(
        @Inject(InputValidationConfigToken)
        private readonly validationConfiguration: InputValidationConfiguration,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.control.statusChanges.pipe(untilDestroyed(this)).subscribe(() => {
            this.errorMessage = runInInjectionContext(this.injector, () =>
                retrieveErrorMessage(this.validationConfiguration, this.control)
            );
            this.controlStateChange.emit(this.controlState);
            this.changeDetectorRef.markForCheck();
        });
    }

    protected get hasError(): boolean {
        return (
            this.control.invalid && (this.control.touched || this.control.dirty)
        );
    }

    protected get disabled(): boolean {
        return this.control.disabled;
    }

    protected get controlState(): InputStateType {
        if (this.disabled) {
            return InputState.Disabled;
        }
        if (this.hasError) {
            return InputState.Invalid;
        }

        return InputState.Valid;
    }
}
