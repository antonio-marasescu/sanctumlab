import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit
} from '@angular/core';
import { ProfileSettingsViewComponent } from '../views/profile-settings-view.component';
import { FormGroup } from '@angular/forms';
import { ProfileSettingsForm } from '../../types/profile-settings-form.types';
import { createSettingsForm } from '../../utils/profile-settings-form.utils';
import { SUPPORTED_LANGUAGES } from '@sanctumlab/fe/shared';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@UntilDestroy()
@Component({
    selector: 'ngx-profile-settings-container',
    standalone: true,
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

    constructor(
        @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
    ) {}

    ngOnInit(): void {
        this.form = createSettingsForm({
            language: this.i18NextService.language
        });
        this.form.controls.language.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(async language => {
                await this.i18NextService.changeLanguage(language);
            });
    }
}
