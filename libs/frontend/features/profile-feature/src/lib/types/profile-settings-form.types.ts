import { FormControl } from '@angular/forms';

export type ProfileSettingsForm = {
    language: FormControl<string>;
};

export type ProfileSettingsFormValue = {
    language: string;
};
