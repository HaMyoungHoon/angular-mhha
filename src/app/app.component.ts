import {afterNextRender, Component, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {DOCUMENT} from "@angular/common";
import {PrimeNGConfig} from "primeng/api";
import {environment} from "../environments/environment.development";
import {main} from "@angular/compiler-cli/src/main";
import {AppConfigService} from "./services/app-config.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private primeng: PrimeNGConfig,
              private configService: AppConfigService, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
    afterNextRender(() => {
      if (environment.production) {
        this.injectScripts();
      }

      this.bindRouteEvents();
    });
  }

  ngOnInit(): void {
    this.primeng.ripple = true;
  }
  injectScripts(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-TG4DXR8B';
    this.renderer.appendChild(this.document.body, script);

    const scriptBody = this.renderer.createElement('script');
    scriptBody.type = 'text/javascript';
    scriptBody.text = `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());

          gtag('config', 'GTM-TG4DXR8B');
        `;
    this.renderer.appendChild(this.document.body, scriptBody);
  }
  bindRouteEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // @ts-ignore
        if (typeof window['gtag'] === 'function') {
          // @ts-ignore
          window['gtag']('event', 'page_view', {
            page_path: event.urlAfterRedirects
          });
        }

        const { theme, darkMode } = this.configService.config();
        const landingTheme = darkMode ? 'aura-dark-blue' : 'aura-light-blue';
        if (event.urlAfterRedirects === '/' && theme !== landingTheme) {
          this.configService.config.update((config) => ({ ...config, theme: landingTheme, dark: darkMode }));
        }
      }
    })
  }
}
