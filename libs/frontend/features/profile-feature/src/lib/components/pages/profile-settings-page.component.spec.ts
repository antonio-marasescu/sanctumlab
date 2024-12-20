import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { ProfileSettingsPageComponent } from './profile-settings-page.component';
import { I18nTranslateService } from '@sanctumlab/fe/shared';

describe('ProfileSettingsPageComponent', () => {
    let component: ProfileSettingsPageComponent;
    let fixture: ComponentFixture<ProfileSettingsPageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProfileSettingsPageComponent],
            providers: [
                provideMockInputValidationConfiguration(),
                {
                    provide: I18nTranslateService,
                    useValue: { changeLanguage: jest.fn(), language: jest.fn() }
                }
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
