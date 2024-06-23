import {
  afterNextRender,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  Renderer2
} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: "app-footer-section",
  standalone: true,
  imports: [],
  templateUrl: "./footer-section.component.html"
})
export class FooterSectionComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef) {
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.injectScripts();
  }
  ngOnDestroy() {
    this.extractScripts();
  }

  injectScripts(): void {
    if (this.document.getElementById("google-adsense-footer-script") !== null) {
      return;
    }
    const scriptBody = this.renderer.createElement("script");
    scriptBody.id = "google-adsense-footer-script";
    scriptBody.type = "text/javascript";
    scriptBody.text = `(adsbygoogle = window.adsbygoogle || []).push({});`;
    this.renderer.appendChild(this.document.getElementById("google-adsense-footer-component"), scriptBody);
  }
  extractScripts(): void {
    const scriptBody = this.document.getElementById("google-adsense-footer-script");
    if (scriptBody === null) {
      return;
    }
    scriptBody.remove();
  }
}
