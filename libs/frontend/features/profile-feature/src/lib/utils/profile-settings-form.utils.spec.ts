import { createSettingsForm } from './profile-settings-form.utils';
import { FALLBACK_LANGUAGE } from '@sanctumlab/fe/shared';

describe('profileSettingsFormUtils', () => {
    describe('createSettingsForm', () => {
        it('should create settings form with fallback values', () => {
            const response = createSettingsForm();
            expect(response.value).toEqual({
                language: FALLBACK_LANGUAGE
            });
        });

        it('should create settings form with populated values', () => {
            const response = createSettingsForm({ language: 'ro' });
            expect(response.value).toEqual({
                language: 'ro'
            });
        });
    });
});
