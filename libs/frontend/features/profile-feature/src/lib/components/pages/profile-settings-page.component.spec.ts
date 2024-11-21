import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { ProfileSettingsPageComponent } from './profile-settings-page.component';

describe('ProfileSettingsPageComponent', () => {
    let component: ProfileSettingsPageComponent;
    let fixture: ComponentFixture<ProfileSettingsPageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProfileSettingsPageComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSettingsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});
