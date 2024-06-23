import {afterNextRender, Component, Inject, OnInit, PLATFORM_ID, Renderer2} from "@angular/core";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {PrimeNGConfig} from "primeng/api";
import {environment} from "../environments/environment.development";
import {AppConfigService} from "./services/common/app-config.service";
import {DEF_LIGHT_THEME, DEF_THEME} from "./guards/f-constants";
import {ToastModule} from "primeng/toast";
import * as FConstants from "./guards/f-constants";
import * as FExtensions from "./guards/f-extentions";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
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
    this.injectScriptsAds();
    this.injectScriptsGoogleMap();
    this.injectScriptsGoogleGeocode();
    this.injectScriptsNaverMap().then((_: void): void => {
      this.injectClusteringScript().then((_: void): void => {
      });
    });
    this.primeng.ripple = true;
  }
  injectScripts(): void {
    const script = this.renderer.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.googletagmanager.com/gtag/js?id=GTM-TG4DXR8B";
    this.renderer.appendChild(this.document.body, script);

    const scriptBody = this.renderer.createElement("script");
    scriptBody.type = "text/javascript";
    scriptBody.text = `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag("js", new Date());

          gtag("config", "GTM-TG4DXR8B");
        `;
    this.renderer.appendChild(this.document.body, scriptBody);
  }
  injectScriptsAds(): void {
    const script = this.renderer.createElement("script");
    script.type = "text/javascript";
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5278104943482837";
    script.crossOrigin = true;
    script.async = true;
    this.renderer.appendChild(this.document.head, script);
  }
  injectScriptsGoogleMap(): void {
    if (this.document.getElementById("google-maps-script") !== null) {
      return;
    }
    const scriptBody = this.renderer.createElement("script");
    scriptBody.id = "google-maps-script"
    scriptBody.src = `https://maps.googleapis.com/maps/api/js?key=${FConstants.MAP_GOOGLE_API_KEY}&loading=async&libraries=marker`;
    scriptBody.async = true;
    scriptBody.defer = true;
    this.renderer.appendChild(this.document.head, scriptBody);
  }
  injectScriptsGoogleGeocode(): void {
    if (this.document.getElementById("google-geocode-script") !== null) {
      return;
    }
    const scriptBody = this.renderer.createElement("script");
    scriptBody.id = "google-geocode-script";
    scriptBody.src = `https://maps.googleapis.com/maps/api/geocode/json?key=${FConstants.MAP_GOOGLE_API_KEY}`;
    scriptBody.async = true;
    this.renderer.appendChild(this.document.head, scriptBody);
  }
  async injectScriptsNaverMap(): Promise<void> {
    if (this.document.getElementById("naver-maps-script") !== null) {
      return;
    }
    const scriptBody = this.renderer.createElement("script");
    scriptBody.id = "naver-maps-script";
    scriptBody.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${FConstants.MAP_NAVER_CLIENT_ID}&submodules=geocoder`;
    scriptBody.async = true;
    this.renderer.appendChild(this.document.head, scriptBody);
    await FExtensions.awaitDelay(1000);
  }
  async injectClusteringScript(): Promise<void> {
    if (this.document.getElementById("naver-marker-clustering") !== null) {
      return;
    }
    const scriptMarkerClustering = this.renderer.createElement("script");
    scriptMarkerClustering.id = "naver-marker-clustering";
    scriptMarkerClustering.src = "/assets/js/MarkerClustering.js";
    this.renderer.appendChild(this.document.head, scriptMarkerClustering);
    await FExtensions.awaitDelay(1000);
  }
  bindRouteEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // @ts-ignore
        if (typeof window["gtag"] === "function") {
          // @ts-ignore
          window["gtag"]("event", "page_view", {
            page_path: event.urlAfterRedirects
          });
        }

        const { theme, darkMode } = this.configService.config();
        const landingTheme = darkMode ? DEF_THEME : DEF_LIGHT_THEME;
        if (event.urlAfterRedirects === "/" && theme !== landingTheme) {
          this.configService.config.update((config) => ({ ...config, theme: landingTheme, dark: darkMode }));
        }
      }
    })
  }
}
