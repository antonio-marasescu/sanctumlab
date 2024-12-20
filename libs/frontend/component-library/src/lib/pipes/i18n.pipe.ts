import { Pipe, PipeTransform } from '@angular/core';
import i18next from 'i18next';

@Pipe({
    name: 'i18nTranslate',
    standalone: true,
    pure: false
})
export class I18nPipe implements PipeTransform {
    transform(key: string, options?: Record<string, string>): string {
        if (!key) return '';
        return i18next.t(key, options);
    }
}
