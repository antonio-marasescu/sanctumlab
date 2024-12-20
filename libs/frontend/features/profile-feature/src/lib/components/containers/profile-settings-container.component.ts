import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit
} from '@angular/core';
import { ProfileSettingsViewComponent } from '../views/profile-settings-view.component';
import { FormGroup } from '@angular/forms';
import { ProfileSettingsForm } from '../../types/profile-settings-form.types';
import { createSettingsForm } from '../../utils/profile-settings-form.utils';
import {
    I18nTranslateService,
    SUPPORTED_LANGUAGES
} from '@sanctumlab/fe/shared';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'ngx-profile-settings-container',
    imports: [ProfileSettingsViewComponent],
    template: `<ngx-profile-settings-view
        [form]="form"
        [languageOptions]="languageOptions"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsContainerComponent implements OnInit {
    protected form!: FormGroup<ProfileSettingsForm>;
    protected readonly languageOptions = SUPPORTED_LANGUAGES;
    private readonly i18NTranslateService = inject(I18nTranslateService);

    ngOnInit(): void {
        this.form = createSettingsForm({
            language: this.i18NTranslateService.language
        });
        this.form.controls.language.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(async language => {
                await this.i18NTranslateService.changeLanguage(language);
            });
    }
}
