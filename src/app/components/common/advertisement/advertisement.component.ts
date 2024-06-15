import {afterNextRender, AfterViewInit, ChangeDetectorRef, Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-advertisement',
  standalone: true,
  imports: [],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.scss'
})
export class AdvertisementComponent implements AfterViewInit {
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef) {
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.injectScripts();
  }

  injectScripts(): void {
    const scriptBody = this.renderer.createElement('script');
    scriptBody.type = 'text/javascript';
    scriptBody.text = `(adsbygoogle = window.adsbygoogle || []).push({});`;
    this.renderer.appendChild(this.document.body, scriptBody);
  }
}
