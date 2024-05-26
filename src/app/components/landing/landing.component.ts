import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AppConfigService} from "../../services/app-config.service";
import {Meta, Title} from "@angular/platform-browser";
import {DEF_TABLE_THEME} from "../../guards/f-constants";
import {NgClass} from "@angular/common";
import {AppNewsComponent} from "./app-news/app-news.component";
import {AppTopbarComponent} from "./app-topbar/app-topbar.component";
import {FooterSectionComponent} from "./footer-section/footer-section.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NgClass,
    AppNewsComponent,
    AppTopbarComponent,
    FooterSectionComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  subscription!: Subscription;
  constructor(private configService: AppConfigService, private metaService: Meta, private titleService: Title) {
  }
  ngOnInit(): void {
    this.titleService.setTitle('angular mhha');
    this.metaService.updateTag({
      name: 'description',
      content: '앵귤러 테스트'
    });
  }

  get tableTheme() {
    return this.configService.config().tableTheme ?? DEF_TABLE_THEME;
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
    const newTableTheme = !dark ? this.tableTheme.replace('dark', 'light') : this.tableTheme.replace('light', 'dark');
    this.configService.config.update((config) => ({ ...config, darkMode: dark, theme: dark ? 'lara-dark-blue' : 'lara-light-blue', tableTheme: newTableTheme }));
  }
}
