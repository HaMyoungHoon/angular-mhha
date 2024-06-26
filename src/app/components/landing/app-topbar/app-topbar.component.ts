import {
  afterNextRender,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from "@angular/core";
import {DOCUMENT, NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AppConfigService} from "../../../services/common/app-config.service";
import {DomHandler} from "primeng/dom";

@Component({
  selector: "app-app-topbar",
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: "./app-topbar.component.html"
})
export class AppTopbarComponent implements OnDestroy {
  @Input() showConfigurator = false;
  @Input() showMenuButton = false;
  @Output() onDarkModeSwitch = new EventEmitter<any>();
  scrollListener: VoidFunction | null = null;
  window: Window;
  constructor(@Inject(DOCUMENT) private document: Document, private el: ElementRef, private renderer: Renderer2,
              private router: Router, private configService: AppConfigService) {
    this.window = document.defaultView as Window;
    afterNextRender(() => {
      this.bindScrollListener();
    });
  }

  get isDarkMode() {
    return this.configService.config().darkMode;
  }
  get isNewsActive() {
    return this.configService.state.newsActive;
  }
  get topbarClass() {
    return {
      "layout-topbar": true,
      "layout-news-active": this.isNewsActive,
      "layout-news-deactive": !this.isNewsActive,
    };
  }
  toggleMenu(): void {
    if (this.configService.state.menuActive) {
      this.configService.hideMenu();
      DomHandler.unblockBodyScroll("blocked-scroll");
    } else {
      this.configService.showMenu();
      DomHandler.blockBodyScroll("blocked-scroll");
    }
  }
  showConfig(): void {
    this.configService.showConfig();
  }
  toggleDarkMode(): void {
    this.onDarkModeSwitch.emit(null);
  }
  bindScrollListener(): void {
    if (!this.scrollListener) {
      this.scrollListener = this.renderer.listen(this.window, "scroll", () => {
        if (this.window.scrollY > 0) {
          this.el.nativeElement.children[0].classList.add("layout-topbar-sticky");
        } else {
          this.el.nativeElement.children[0].classList.remove("layout-topbar-sticky");
        }
      });
    }
  }
  unbindScrollListener(): void {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
  }
  ngOnDestroy(): void {
    this.unbindScrollListener();
  }
}
