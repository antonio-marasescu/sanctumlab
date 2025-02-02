import {
    ChangeDetectionStrategy,
    Component,
    EnvironmentInjector,
    Inject,
    input,
    OnInit,
    output,
    runInInjectionContext,
    signal
} from '@angular/core';
import { FormControl, FormControlStatus } from '@angular/forms';
import { InputState } from '../../types/internal/input-internal.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { retrieveErrorMessage } from '../../utils/validation.utils';
import {
    InputValidationConfigToken,
    InputValidationConfiguration
} from '../../config/input-validation.config';

@UntilDestroy()
@Component({
    selector: 'ngx-clib-input-validation',
    imports: [],
    template: `@if (controlStatus() === InputState.INVALID && errorMessage()) {
        <div class="label">
            <span class="label-text-alt text-error">{{ errorMessage() }} </span>
        </div>
    }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputValidationComponent implements OnInit {
    public control = input.required<FormControl>();
    public controlStateChange = output<FormControlStatus>();
    protected readonly InputState = InputState;
    protected errorMessage = signal('');
    protected controlStatus = signal('');

    constructor(
        @Inject(InputValidationConfigToken)
        private readonly validationConfiguration: InputValidationConfiguration,
        private readonly injector: EnvironmentInjector
    ) {}

    ngOnInit() {
        this.control()
            .statusChanges.pipe(untilDestroyed(this))
            .subscribe(status => {
                const message = runInInjectionContext(this.injector, () =>
                    retrieveErrorMessage(
                        this.validationConfiguration,
                        this.control()
                    )
                );
                this.errorMessage.set(message);
                this.controlStatus.set(status);
                this.controlStateChange.emit(status);
            });
    }
}
