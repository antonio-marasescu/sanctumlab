import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { ProfileSettingsContainerComponent } from './profile-settings-container.component';
import { I18nTranslateService } from '@sanctumlab/fe/shared';

describe('ProfileSettingsContainerComponent', () => {
    let component: ProfileSettingsContainerComponent;
    let fixture: ComponentFixture<ProfileSettingsContainerComponent>;
    let translationService: I18nTranslateService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProfileSettingsContainerComponent],
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
        fixture = TestBed.createComponent(ProfileSettingsContainerComponent);
        translationService = TestBed.inject(I18nTranslateService);
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
