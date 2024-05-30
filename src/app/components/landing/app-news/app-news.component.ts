import {afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {NewsItem} from "../../../models/common/news-item";
import {AppConfigService} from "../../../services/app-config.service";
import {getLocalStorage, setLocalStorage} from "../../../guards/amhohwa";
import * as FConstants from "../../../guards/f-constants";
import News from "./news.json";

@Component({
  selector: 'app-app-news',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './app-news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNewsComponent {
  announcement: NewsItem | null = null;
  constructor(private configService: AppConfigService, private cd: ChangeDetectorRef) {
    this.initNews();
    afterNextRender(() => {
      const itemString = getLocalStorage(FConstants.STORAGE_KEY_NEWS);
      if (itemString.length > 0) {
        const item = JSON.parse(itemString);
        this.configService.state.newsActive = !item.hiddenNews || item.hiddenNews !== News.id;
      } else {
        this.configService.state.newsActive = true;
      }
      this.cd.markForCheck();
    });
  }

  get isNewsActive(): boolean {
    return this.configService.state.newsActive ?? true;
  }
  hideNews(): void {
    this.configService.hideNews();
    const item = {
      hiddenNews: this.announcement?.id
    };
    setLocalStorage(FConstants.STORAGE_KEY_NEWS, JSON.stringify(item));
  }
  initNews() : void {
    this.announcement = new class implements NewsItem {
      content = News.content;
      id = News.id;
      linkHref = News.linkHref;
      linkText = News.linkText;
    }();
  }
}
