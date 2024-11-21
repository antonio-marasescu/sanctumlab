import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AdminRestrictDirective } from './admin-restrict.directive';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

describe('AdminRestrictDirective', () => {
    let mockAuthService: {
        isAdmin: jest.Mock;
    };
    let mockTemplateRef: TemplateRef<any>;
    let mockViewContainer: {
        createEmbeddedView: jest.Mock;
        clear: jest.Mock;
    };
    let directive: AdminRestrictDirective;

    beforeEach(() => {
        mockAuthService = {
            isAdmin: jest.fn()
        };
        mockTemplateRef = {} as TemplateRef<any>;
        mockViewContainer = {
            createEmbeddedView: jest.fn(),
            clear: jest.fn()
        };
        TestBed.configureTestingModule({
            providers: [
                AdminRestrictDirective,
                { provide: AuthenticationService, useValue: mockAuthService },
                { provide: TemplateRef, useValue: {} },
                { provide: ViewContainerRef, useValue: mockViewContainer }
            ]
        });
        directive = TestBed.inject(AdminRestrictDirective);
    });

    it('should create', () => {
        expect(directive).toBeDefined();
    });

    it('should create the view if the user is an admin', fakeAsync(() => {
        jest.spyOn(mockAuthService, 'isAdmin').mockReturnValue(
            Promise.resolve(true)
        );

        directive.ngOnInit();
        tick();

        expect(mockViewContainer.createEmbeddedView).toHaveBeenCalledWith(
            mockTemplateRef
        );
        expect(mockViewContainer.clear).not.toHaveBeenCalled();
    }));

    it('should clear the view if the user is not an admin', fakeAsync(() => {
        jest.spyOn(mockAuthService, 'isAdmin').mockReturnValue(
            Promise.resolve(false)
        );

        directive.ngOnInit();
        tick();

        expect(mockViewContainer.clear).toHaveBeenCalledTimes(1);
        expect(mockViewContainer.createEmbeddedView).not.toHaveBeenCalled();
    }));
});
