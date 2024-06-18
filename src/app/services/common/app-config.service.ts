import {effect, Inject, Injectable, PLATFORM_ID, signal, WritableSignal} from "@angular/core";
import {AppConfig} from "../../models/common/app-config";
import {AppState} from "../../models/common/app-state";
import {Subject} from "rxjs";
import {isPlatformBrowser} from "@angular/common";
import * as FConstants from "../../guards/f-constants";
import {getLocalStorage, setLocalStorage} from "../../guards/amhohwa";

@Injectable({
  providedIn: "root"
})
export class AppConfigService {
  private _config: AppConfig = {
    theme: FConstants.DEF_THEME,
    darkMode: true,
    ripple: true,
    scale: 14,
    tableTheme: FConstants.DEF_TABLE_THEME
  }
  state: AppState = {
    configActive: false,
    menuActive: false,
    newsActive: false,
  }
  config: WritableSignal<AppConfig>;
  private configUpdate = new Subject<AppConfig>();
  configUpdate$ = this.configUpdate.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.config = signal<AppConfig>(this._config);
    this.config().scale = +getLocalStorage(FConstants.STORAGE_KEY_SCALE);

    effect(() => {
      const config = this.config();
      if (isPlatformBrowser(this.platformId)) {
        if (this.updateStyle(config)) {
          this.changeTheme();
          const newTableTheme = !config.darkMode ? config.tableTheme?.replace("dark", "light") : config.tableTheme?.replace("light", "dark");
          this.replaceTableTheme(newTableTheme ?? FConstants.DEF_TABLE_THEME);
        }
        this.changeScale(config.scale ?? 14);
        this.onConfigUpdate();
      }
    })
  }

  updateStyle(config: AppConfig): boolean {
    return config.theme !== this._config.theme || config.darkMode !== this._config.darkMode || config.tableTheme !== this._config.tableTheme;
  }
  onConfigUpdate(): void {
    const config = this.config();
    config.tableTheme = !config.darkMode ? config.tableTheme?.replace("light", "dark") : config.tableTheme?.replace("dark", "light");
    this._config = { ...config };
    this.configUpdate.next(this.config());
  }
  showMenu(): void {
    this.state.menuActive = true;
  }
  hideMenu(): void {
    this.state.menuActive = false;
  }
  showConfig(): void {
    this.state.configActive = true;
  }
  hideConfig(): void {
    this.state.configActive = false;
  }
  showNews(): void {
    this.state.newsActive = true;
  }
  hideNews(): void {
    this.state.newsActive = false;
  }
  changeTheme(): void {
    const config = this.config();
    const themeLink = <HTMLLinkElement>document.getElementById(FConstants.THEME_LINK);
    const themeLinkHref = themeLink.getAttribute("href")!;
    const newHref = themeLinkHref.split("/")
      .map((el) => (el == this._config.theme ? (el = config.theme ?? FConstants.DEF_THEME) : el == `theme-${this._config.darkMode}` ? (el = `theme-${config.darkMode}`) : el))
      .join("/");
    this.replaceThemeLink(newHref);
  }
  replaceThemeLink(href: string): void {
    let themeLink = <HTMLLinkElement>document.getElementById(FConstants.THEME_LINK);
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);
    cloneLinkElement.setAttribute("href", href);
    cloneLinkElement.setAttribute("id", FConstants.THEME_LINK + "-clone");
    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);
    cloneLinkElement.addEventListener("load", () => {
      themeLink.remove();
      cloneLinkElement.setAttribute("id", FConstants.THEME_LINK);
    });
    setLocalStorage(FConstants.STORAGE_KEY_IS_DARK, this.config().darkMode?.toString() ?? "true");
  }
  replaceTableTheme(newTheme: string): void {
    const linkElement = <HTMLLinkElement>document.getElementById(FConstants.HOME_TABLE_LINK);
    const tableThemeTokens = linkElement?.getAttribute("href")?.split("/") ?? null;
    const currentTableTheme = tableThemeTokens ? tableThemeTokens[tableThemeTokens.length - 2] : FConstants.DEF_TABLE_THEME;
    if (currentTableTheme !== newTheme && tableThemeTokens) {
      const newThemeUrl = linkElement?.getAttribute("href")?.replace(currentTableTheme, newTheme) ?? FConstants.DEF_THEME;
      const cloneLinkElement = <HTMLLinkElement>linkElement.cloneNode(true);
      cloneLinkElement.setAttribute("id", FConstants.HOME_TABLE_LINK + "-clone");
      cloneLinkElement.setAttribute("href", newThemeUrl);
      cloneLinkElement.addEventListener("load", () => {
        linkElement.remove();
        cloneLinkElement.setAttribute("id", FConstants.HOME_TABLE_LINK);
      });
      linkElement.parentNode?.insertBefore(cloneLinkElement, linkElement.nextSibling);
    }
  }
  changeScale(value: number): void {
    if (value < 10) {
      value = 14;
    }
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.style.fontSize = `${value}px`;
    }
    setLocalStorage(FConstants.STORAGE_KEY_SCALE, value.toString());
  }
}
