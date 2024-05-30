import {Component, Inject} from '@angular/core';
import {DOCUMENT, NgClass} from "@angular/common";
import {AppConfigService} from "../../services/app-config.service";
import * as FConstants from "../../guards/f-constants";
import {DomHandler} from "primeng/dom";
import {AppNewsComponent} from "../landing/app-news/app-news.component";
import {AppTopbarComponent} from "../landing/app-topbar/app-topbar.component";
import {RouterOutlet} from "@angular/router";
import {FooterSectionComponent} from "../landing/footer-section/footer-section.component";
import {getLocalStorage} from "../../guards/amhohwa";
import {AppConfigComponent} from "./app-config/app-config.component";

@Component({
  selector: 'app-app-main',
  standalone: true,
  imports: [
    NgClass,
    AppNewsComponent,
    AppTopbarComponent,
    RouterOutlet,
    FooterSectionComponent,
    AppConfigComponent
  ],
  templateUrl: './app-main.component.html'
})
export class AppMainComponent {
  constructor(@Inject(DOCUMENT) private document: Document, private configService: AppConfigService) {
    if (getLocalStorage(FConstants.STORAGE_KEY_IS_DARK) != 'true') {
      this.toggleDarkMode();
    }

    let scale :number = +getLocalStorage(FConstants.STORAGE_KEY_SCALE);
    if (scale != 0) {
      this.configService.changeScale(scale);
    }
  }

  get isNewsActive(): boolean {
    return this.configService.state.newsActive ?? false;
  }
  get isDarkMode(): boolean {
    return this.configService.config().darkMode ?? false;
  }
  get isRippleDisabled(): boolean {
    return !this.configService.config().ripple;
  }
  get isMenuActive(): boolean {
    return this.configService.state.menuActive ?? false;
  }
  get theme(): string {
    return this.configService.config().theme ?? FConstants.DEF_THEME;
  }
  get containerClass() {
    return {
      'layout-news-active': this.isNewsActive,
      'p-ripple-disabled': this.isRippleDisabled,
      'layout-dark': this.isDarkMode,
      'layout-light': !this.isDarkMode
    };
  }
  toggleDarkMode(): void {
    let newTheme = null;
    const { theme, darkMode } = this.configService.config();
    if (darkMode) {
      newTheme = theme?.replace('dark', 'light');
    } else {
      if (theme?.includes('light') && theme !== 'fluent-light') newTheme = theme?.replace('light', 'dark');
      else newTheme = FConstants.DEF_THEME;
    }
    this.configService.config.update((config) => ({ ...config, darkMode: !darkMode, theme: newTheme }));
  }
  hideMenu(): void {
    this.configService.hideMenu();
    DomHandler.unblockBodyScroll('blocked-scroll');
  }
}
