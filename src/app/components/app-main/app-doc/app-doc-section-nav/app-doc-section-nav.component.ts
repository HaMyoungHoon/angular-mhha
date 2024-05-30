import {
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import {DocModel} from "../../../../models/common/doc-model";
import {Subscription} from "rxjs";
import {DOCUMENT, isPlatformBrowser, Location} from "@angular/common";
import {ObjectUtils} from "primeng/utils";
import {DomHandler} from "primeng/dom";
import {DocPage} from "../../../../models/doc/DocPage";

@Component({
  selector: 'app-app-doc-section-nav',
  imports: [],
  templateUrl: './app-doc-section-nav.component.html'
})
export class AppDocSectionNavComponent implements OnInit, OnDestroy {
  @Input() docs: DocPage[];
  visible: boolean;
  subscription!: Subscription;
  scrollListener: any;
  _activeId: any;
  isScrollBlocked: boolean;
  topbarHeight: number;
  scrollEndTimer: any;
  @ViewChild('nav') nav?: ElementRef;
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private location: Location,
              private zone: NgZone, private renderer: Renderer2) {
    this.visible = false;
    this.docs = [];
    this.isScrollBlocked = false;
    this.topbarHeight = 0;
  }

  get activeId() {
    return this._activeId;
  }
  set activeId(val: string) {
    if (val !== this._activeId) {
      this._activeId = val;
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const hash = window.location.hash.substring(1);
      const hasHash = ObjectUtils.isNotEmpty(hash);
      const id = hasHash ? hash : ((this.docs && this.docs[0]) || {}).name;

      this.activeId = id;
      hasHash &&
      setTimeout(() => {
        this.scrollToLabelById(id);
      }, 250);

      this.zone.runOutsideAngular(() => {
        this.scrollListener = this.renderer.listen(this.document, 'scroll', (event: any) => {
          this.onScroll();
        });
      });
    }
  }
  ngOnDestroy(): void {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
  }

  getLabels() {
    return [...Array.from(this.document.querySelectorAll(':is(h1,h2,h3).doc-section-label'))].filter((el: any) => DomHandler.isVisible(el));
  }
  onScroll() {
    if (isPlatformBrowser(this.platformId) && this.nav) {
      if (!this.isScrollBlocked) {
        this.zone.run(() => {
          if (typeof document !== 'undefined') {
            const labels = this.getLabels();
            const windowScrollTop = DomHandler.getWindowScrollTop();

            labels.forEach((label) => {
              const { top } = DomHandler.getOffset(label);
              const threshold = this.getThreshold(label);

              if (top - threshold <= windowScrollTop) {
                const link = DomHandler.findSingle(label, 'a');
                this.activeId = link.id;
              }
            });
          }
        });
      }

      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = setTimeout(() => {
        this.isScrollBlocked = false;

        const activeItem = DomHandler.findSingle(this.nav?.nativeElement, '.active-navbar-item');

        activeItem && activeItem.scrollIntoView({ block: 'nearest', inline: 'start' });
      }, 50);
    }
  }
  onButtonClick(event: any, doc: any) {
    this.activeId = doc.id;
    setTimeout(() => {
      this.scrollToLabelById(doc.id);
      this.isScrollBlocked = true;
    }, 1);

    event.preventDefault();
  }

  getThreshold(label: any) {
    if (typeof document !== undefined) {
      if (!this.topbarHeight) {
        const topbar = DomHandler.findSingle(document.body, '.layout-topbar');

        this.topbarHeight = topbar ? DomHandler.getHeight(topbar) : 0;
      }
    }

    return this.topbarHeight + DomHandler.getHeight(label) * 3.5;
  }
  scrollToLabelById(id: any): void {
    if (typeof document !== undefined) {
      const label = document.getElementById(id);
      this.location.go(this.location.path().split('#')[0] + '#' + id);
      setTimeout(() => {
        label && label.parentElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 1);
    }
  }
}
