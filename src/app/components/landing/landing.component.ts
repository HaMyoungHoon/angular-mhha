import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AppConfigService} from "../../services/common/app-config.service";
import {Meta, Title} from "@angular/platform-browser";
import {NgClass} from "@angular/common";
import {AppNewsComponent} from "./app-news/app-news.component";
import {AppTopbarComponent} from "./app-topbar/app-topbar.component";
import {FooterSectionComponent} from "./footer-section/footer-section.component";
import {getLocalStorage} from "../../guards/amhohwa";
import * as FConstants from "../../guards/f-constants";
import {AppMidComponent} from "./app-mid/app-mid.component";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NgClass,
    AppNewsComponent,
    AppTopbarComponent,
    FooterSectionComponent,
    AppMidComponent,
    ToastModule
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
  subscription!: Subscription;
  constructor(private configService: AppConfigService, private metaService: Meta, private titleService: Title) {
    if (getLocalStorage(FConstants.STORAGE_KEY_IS_DARK) == 'true') {
      this.toDark();
    } else {
      this.toLight();
    }

    let scale :number = +getLocalStorage(FConstants.STORAGE_KEY_SCALE);
    if (scale != 0) {
      this.configService.changeScale(scale);
    }
  }
  ngOnInit(): void {
    this.titleService.setTitle('angular mhha');
    this.metaService.updateTag({
      name: 'description',
      content: '앵귤러 테스트'
    });
  }

  get tableTheme() {
    return this.configService.config().tableTheme ?? FConstants.DEF_TABLE_THEME;
  }
  get landingClass() {
    return {
      'layout-dark': this.isDarkMode,
      'layout-light': !this.isDarkMode,
      'layout-news-active': this.isNewsActive
    };
  }
  get isDarkMode() {
    return this.configService.config().darkMode;
  }
  get isNewsActive() {
    return this.configService.state.newsActive;
  }
  toggleDarkMode(): void {
    const dark = !this.isDarkMode;
    if (dark) {
      this.toDark();
    } else {
      this.toLight();
    }
  }
  toDark(): void {
    const newTableTheme = this.tableTheme.replace('light', 'dark');
    this.configService.config.update((config) => ({ ...config, darkMode: true, theme: FConstants.DEF_THEME, tableTheme: newTableTheme }));
  }
  toLight(): void {
    const newTableTheme = this.tableTheme.replace('dark', 'light');
    this.configService.config.update((config) => ({ ...config, darkMode: false, theme: FConstants.DEF_LIGHT_THEME, tableTheme: newTableTheme }));
  }
}
