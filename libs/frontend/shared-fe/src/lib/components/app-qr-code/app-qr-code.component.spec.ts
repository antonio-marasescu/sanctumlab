import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { AppQrCodeComponent } from './app-qr-code.component';

describe('AppQrCodeComponent', () => {
    let component: AppQrCodeComponent;
    let fixture: ComponentFixture<AppQrCodeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AppQrCodeComponent],
            providers: [provideMockInputValidationConfiguration()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppQrCodeComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should initialize on ngOnInit', () => {
        expect(component['codeControl']).toBeUndefined();
        expect(component['qrCode']).toBeUndefined();

        fixture.detectChanges();

        expect(component['codeControl']).toBeDefined();
        expect(component['qrCode']).toBeDefined();
        expect(component['qrCode']()).toEqual('http://localhost');
    });
});
