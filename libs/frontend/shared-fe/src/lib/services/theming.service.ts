import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemingService {
    protected readonly ColorThemeKey = 'data-theme';
    protected readonly LightMode = 'corporate';
    protected readonly DarkMode = 'dark';

    public isLightMode(): boolean {
        const colorTheme = localStorage.getItem(this.ColorThemeKey);
        return colorTheme === this.LightMode;
    }

    public isDarkMode(): boolean {
        const colorTheme = localStorage.getItem(this.ColorThemeKey);
        return colorTheme === this.DarkMode;
    }

    public toggleDarkMode(): void {
        document.documentElement.setAttribute(
            this.ColorThemeKey,
            this.DarkMode
        );
        localStorage.setItem(this.ColorThemeKey, this.DarkMode);
    }

    public toggleLightMode(): void {
        document.documentElement.setAttribute(
            this.ColorThemeKey,
            this.LightMode
        );
        localStorage.setItem(this.ColorThemeKey, this.LightMode);
    }
}
