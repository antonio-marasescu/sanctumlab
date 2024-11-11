import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
    SelectInputComponent,
    SelectOption
} from '@sanctumlab/fe/component-library';
import { I18NextModule } from 'angular-i18next';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileSettingsForm } from '../../types/profile-settings-form.types';

@Component({
    selector: 'ngx-profile-settings-view',
    standalone: true,
    imports: [SelectInputComponent, I18NextModule, ReactiveFormsModule],
    template: `<div class="m-12">
        <h2 class="text-xl">{{ 'profile:title' | i18nextEager }}</h2>
        <form
            [formGroup]="form"
            novalidate
            class="grid grid-cols-1 md:grid-cols-3 pt-4"
        >
            <ngx-clib-select-input
                id="languages"
                label="profile:form.language"
                placeholder="profile:form.languagePlaceholder"
                [control]="form.controls.language"
                [options]="languageOptions"
            />
        </form>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsViewComponent {
    @Input() form!: FormGroup<ProfileSettingsForm>;
    @Input() languageOptions: SelectOption[] = [];
}
