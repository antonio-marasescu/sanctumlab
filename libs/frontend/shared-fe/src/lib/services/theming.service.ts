import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemingService {
    protected readonly ColorThemeKey = 'color-theme';
    protected readonly LightMode = 'light';
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
        document.documentElement.classList.remove(this.LightMode);
        document.documentElement.classList.add(this.DarkMode);
        localStorage.setItem(this.ColorThemeKey, this.DarkMode);
    }

    public toggleLightMode(): void {
        document.documentElement.classList.remove(this.DarkMode);
        document.documentElement.classList.add(this.LightMode);
        localStorage.setItem(this.ColorThemeKey, this.LightMode);
    }
}
