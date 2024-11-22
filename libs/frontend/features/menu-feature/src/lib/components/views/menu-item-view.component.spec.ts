import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, importProvidersFrom, Input } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import {
    MarkdownInputComponent,
    provideMockInputValidationConfiguration
} from '@sanctumlab/fe/component-library';
import { MenuItemViewComponent } from './menu-item-view.component';
import {
    AuthenticationService,
    provideMockAuthConfiguration
} from '@sanctumlab/fe/auth';
import { createMockProductItemDto } from '@sanctumlab/api-interfaces';
import { By } from '@angular/platform-browser';
import { QuillViewComponent } from 'ngx-quill';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'quill-view',
    standalone: true,
    imports: [],
    template: ``
})
export class MockQuillViewComponent {
    @Input() content?: string;
}
jest.mock('ngx-quill');

describe('MenuItemViewComponent', () => {
    let component: MenuItemViewComponent;
    let fixture: ComponentFixture<MenuItemViewComponent>;
    let mockAuthService: Partial<AuthenticationService>;

    beforeEach(waitForAsync(() => {
        mockAuthService = {
            isAdmin: () => Promise.resolve(true)
        };
        TestBed.configureTestingModule({
            imports: [MenuItemViewComponent],
            providers: [
                importProvidersFrom(I18NextModule.forRoot()),
                provideMockInputValidationConfiguration(),
                provideMockAuthConfiguration(),
                {
                    provide: AuthenticationService,
                    useValue: mockAuthService
                }
            ]
        })
            .overrideComponent(MenuItemViewComponent, {
                add: { imports: [MockQuillViewComponent] },
                remove: { imports: [QuillViewComponent] }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemViewComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should show disable/enable buttons based on item available property', () => {
        fixture.componentRef.setInput(
            'item',
            createMockProductItemDto({ available: true })
        );
        fixture.detectChanges();

        let disableButton = fixture.debugElement.query(
            By.css(`#disable-button`)
        );
        let enableButton = fixture.debugElement.query(By.css(`#enable-button`));

        expect(disableButton).toBeDefined();
        expect(enableButton).toBeNull();

        fixture.componentRef.setInput(
            'item',
            createMockProductItemDto({ available: false })
        );
        fixture.detectChanges();

        disableButton = fixture.debugElement.query(By.css(`#disable-button`));
        enableButton = fixture.debugElement.query(By.css(`#enable-button`));

        expect(disableButton).toBeNull();
        expect(enableButton).toBeDefined();
    });

    it('should hide action button if not admin', () => {
        jest.spyOn(mockAuthService, 'isAdmin').mockReturnValue(
            Promise.resolve(false)
        );
        fixture.componentRef.setInput(
            'item',
            createMockProductItemDto({ available: true })
        );
        fixture.detectChanges();

        const disableButton = fixture.debugElement.query(
            By.css(`#disable-button`)
        );
        const updateButton = fixture.debugElement.query(
            By.css(`#update-button`)
        );

        expect(disableButton).toBeNull();
        expect(updateButton).toBeNull();

        fixture.componentRef.setInput(
            'item',
            createMockProductItemDto({ available: false })
        );
        fixture.detectChanges();

        const enableButton = fixture.debugElement.query(
            By.css(`#enable-button`)
        );
        expect(enableButton).toBeNull();
    });
});
