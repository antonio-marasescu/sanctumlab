import { Inject } from '@angular/core';
import i18next from 'i18next';

@Inject({ providedIn: 'any' })
export class I18nTranslateService {
    public get language(): string {
        return i18next.language;
    }

    public async changeLanguage(language: string): Promise<void> {
        await i18next.changeLanguage(language);
    }
}
