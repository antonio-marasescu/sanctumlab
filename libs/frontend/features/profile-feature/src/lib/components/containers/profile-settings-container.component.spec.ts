import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import {
    I18NEXT_SERVICE,
    I18NextModule,
    ITranslationService
} from 'angular-i18next';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { ProfileSettingsContainerComponent } from './profile-settings-container.component';

describe('ProfileSettingsContainerComponent', () => {
    let component: ProfileSettingsContainerComponent;
    let fixture: ComponentFixture<ProfileSettingsContainerComponent>;
    let translationService: ITranslationService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProfileSettingsContainerComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSettingsContainerComponent);
        translationService = TestBed.inject(I18NEXT_SERVICE);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should initialize form and subscription on ngOnInit', () => {
        expect(component['form']).toBeUndefined();
        fixture.detectChanges();
        expect(component['form']).toBeDefined();
    });

    it('should change language on control language value change', fakeAsync(() => {
        fixture.detectChanges();
        const changeLanguageSpy = jest
            .spyOn(translationService, 'changeLanguage')
            .mockImplementation();

        component['form'].controls.language.setValue('ro');
        tick();

        expect(changeLanguageSpy).toHaveBeenCalledTimes(1);
        expect(changeLanguageSpy).toHaveBeenCalledWith('ro');
    }));
});
