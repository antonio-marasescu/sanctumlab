import { FormControl, FormGroup } from '@angular/forms';
import {
    ProfileSettingsForm,
    ProfileSettingsFormValue
} from '../types/profile-settings-form.types';
import { FALLBACK_LANGUAGE } from '@sanctumlab/fe/shared';

export function createSettingsForm(
    values: Partial<ProfileSettingsFormValue>
): FormGroup<ProfileSettingsForm> {
    return new FormGroup<ProfileSettingsForm>({
        language: new FormControl<string>(
            values.language ?? FALLBACK_LANGUAGE,
            {
                validators: [],
                nonNullable: true
            }
        )
    });
}
