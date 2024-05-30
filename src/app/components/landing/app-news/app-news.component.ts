import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {NgIf} from "@angular/common";
import {NewsItem} from "../../../models/common/news-item";
import {AppConfigService} from "../../../services/common/app-config.service";
import {getLocalStorage, setLocalStorage} from "../../../guards/amhohwa";
import * as FConstants from "../../../guards/f-constants";
import {AngularCommonService} from "../../../services/rest/angular-common.service";
import {FDialogService} from "../../../services/common/f-dialog.service";

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
  news?: NewsItem;
  constructor(private configService: AppConfigService, private cd: ChangeDetectorRef,
              private angularService: AngularCommonService, private fDialogService: FDialogService) {
    this.initNews();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  get isNewsActive(): boolean {
    return this.configService.state.newsActive ?? true;
  }
  hideNews(): void {
    this.configService.hideNews();
    if (this.news?.thisIndex) {
      setLocalStorage(FConstants.STORAGE_KEY_NEWS, this.news.thisIndex.toString());
    }
  }
  initNews() : void {
    this.angularService.getNewsOne().then(x => {
      this.news = x.Data;
      const hiddenNewsIndex = getLocalStorage(FConstants.STORAGE_KEY_NEWS);
      if (hiddenNewsIndex.length > 0) {
        this.configService.state.newsActive = hiddenNewsIndex !== this.news?.thisIndex.toString();
      } else {
        this.configService.showNews();
      }
    }).catch(x => {
      this.fDialogService.warn('news', x.message);
    }).finally(() => {
      this.cd.detectChanges();
    });
  }
  gotoLink(): void {
    if (this.news?.linkHref) {
      window.open(this.news.linkHref, "_blank");
    }
  }
}
