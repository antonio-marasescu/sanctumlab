import { TestBed } from '@angular/core/testing';
import { ThemingService } from './theming.service';

describe('ThemingService', () => {
    const localStorageMock: Record<string, string> = {};
    const documentMockAttributes: Record<string, string> = {};
    let service: ThemingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThemingService]
        });
        service = TestBed.inject(ThemingService);
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation((key: string) => {
            return localStorageMock[key] || null;
        });
        const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
        mockSetItem.mockImplementation((key: string, value: string) => {
            localStorageMock[key] = value;
        });

        const mockSetAttribute = jest.spyOn(
            document.documentElement,
            'setAttribute'
        );
        mockSetAttribute.mockImplementation((key: string, value: string) => {
            documentMockAttributes[key] = value;
        });
    });

    afterEach(() => {
        Object.keys(localStorageMock).forEach(
            key => delete localStorageMock[key]
        );
        Object.keys(documentMockAttributes).forEach(
            key => delete documentMockAttributes[key]
        );
    });

    it('should determine if Light Mode is active', () => {
        localStorageMock['data-theme'] = 'winter';
        expect(service.isLightMode()).toBe(true);
    });

    it('should determine if Dark Mode is active', () => {
        localStorageMock['data-theme'] = 'dark';
        expect(service.isDarkMode()).toBe(true);
    });

    it('should determine if no theme is selected', () => {
        localStorageMock['data-theme'] = 'unknown';
        expect(service.isNoThemeSelected()).toBe(true);
    });

    it('should toggle Dark Mode', () => {
        service.toggleDarkMode();
        expect(localStorage.setItem).toHaveBeenCalledWith('data-theme', 'dark');
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
            'data-theme',
            'dark'
        );
        expect(localStorageMock['data-theme']).toBe('dark');
        expect(documentMockAttributes['data-theme']).toBe('dark');
    });

    it('should toggle Light Mode', () => {
        service.toggleLightMode();
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'data-theme',
            'winter'
        );
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
            'data-theme',
            'winter'
        );
        expect(localStorageMock['data-theme']).toBe('winter');
        expect(documentMockAttributes['data-theme']).toBe('winter');
    });
});
