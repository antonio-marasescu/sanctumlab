import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileSettingsForm } from '../../types/profile-settings-form.types';
import { ProfileSettingsViewComponent } from './profile-settings-view.component';

describe('ProfileSettingsViewComponent', () => {
    let component: ProfileSettingsViewComponent;
    let fixture: ComponentFixture<ProfileSettingsViewComponent>;
    let form: FormGroup<ProfileSettingsForm>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProfileSettingsViewComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSettingsViewComponent);
        form = new FormGroup<ProfileSettingsForm>({
            language: new FormControl<string>('', {
                nonNullable: true,
                validators: []
            })
        });
        component = fixture.componentInstance;
        component.form = form;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});
