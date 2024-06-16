import {afterNextRender, ChangeDetectorRef, Component, ElementRef, OnDestroy} from '@angular/core';
import {DocMenuItem} from "../../../models/rest/doc/doc-menu-item";
import {FDialogService} from "../../../services/common/f-dialog.service";
import {AngularCommonService} from "../../../services/rest/angular-common.service";
import {Subscription} from "rxjs";
import {AppConfigService} from "../../../services/common/app-config.service";
import {NavigationEnd, Router} from "@angular/router";
import {DomHandler} from "primeng/dom";
import {NgForOf} from "@angular/common";
import {DocMenuItemComponent} from "./app-menu-item/doc-menu-item.component";
import {VideoStreamService} from "../../../services/rest/video-stream.service";

@Component({
  selector: 'doc-menu',
  standalone: true,
  imports: [
    NgForOf, DocMenuItemComponent
  ],
  templateUrl: './doc-menu.component.html',
  host: {
    class: 'layout-sidebar',
    '[class.active]': 'isActive'
  },
  styleUrl: './doc-menu.component.scss'
})
export class DocMenuComponent implements OnDestroy {
  menu?: DocMenuItem[];
  routerSubscription?: Subscription;
  constructor(private configService: AppConfigService, private el: ElementRef,
              private router: Router, private cd: ChangeDetectorRef,
              private fDialogService: FDialogService, private angularCommonService: AngularCommonService,
              private videoStreamService: VideoStreamService) {
    this.initMenu();
    afterNextRender(() => {
      setTimeout(() => {
        this.scrollToActiveItem();
      }, 100)
      this.routerSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd && this.configService.state.menuActive) {
          this.configService.hideMenu();
          DomHandler.unblockBodyScroll('blocked-scroll');
        }
      })
      this.cd.markForCheck();
    });
  }

  get isActive() {
    return this.configService.state.menuActive;
  }
  initMenu(): void {
    this.angularCommonService.getMenu().then(x => {
      if (x.result) {
        this.menu = x.data;
        this.initVideoMenu();
      } else {
        this.fDialogService.warn('menu', x.msg);
      }
    }).catch(x => {
      this.fDialogService.error('menu catch', x.message);
    });
  }
  initVideoMenu(): void {
    this.videoStreamService.getCategoryRootList().then(x => {
      if (x.result) {
        const videoMenu = this.menu?.filter(x => x.name == "Video")
        if (videoMenu === undefined || videoMenu.length <= 0) {
          return;
        }
        x.data?.forEach(y => {
          videoMenu[0].children?.push(new DocMenuItem().setVideoMenu(y));
        });
        return;
      }
      this.fDialogService.warn('video menu init', x.msg);
    }).catch(x => {
      this.fDialogService.error('video menu init catch', x.message);
    });
  }
  scrollToActiveItem(): void {
    const activeItem = DomHandler.findSingle(this.el.nativeElement, '.router-link-active');
    if (activeItem && !this.isInViewport(activeItem)) {
      activeItem.scrollIntoView({ block: 'center' });
    }
  }
  isInViewport(element: any): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight ||
      (document.documentElement.clientHeight && rect.right <= (window.innerWidth || document.documentElement.clientWidth)));
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = undefined;
    }
  }
}
