import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockInputValidationConfiguration } from '@sanctumlab/fe/component-library';
import { UnauthorizedPageComponent } from './unauthorized-page.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('UnauthorizedPageComponent', () => {
    let component: UnauthorizedPageComponent;
    let fixture: ComponentFixture<UnauthorizedPageComponent>;
    const mockRouter = {
        navigate: jest.fn()
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [UnauthorizedPageComponent],
            providers: [
                provideMockInputValidationConfiguration(),
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnauthorizedPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should navigate to homepage on back button press', () => {
        const button = fixture.debugElement.query(By.css('#back-button'));
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');

        button.children[0].nativeElement.click();
        expect(navigateSpy).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
});
