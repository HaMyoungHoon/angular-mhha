import {afterNextRender, AfterViewInit, ChangeDetectorRef, Component, Inject, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: "app-map-google",
  templateUrl: "./map-google.component.html",
  styleUrl: "./map-google.component.scss"
})
export class MapGoogleComponent implements AfterViewInit {
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef) {
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit() {
  }
  injectScripts(): void {
    const scriptBody = this.renderer.createElement("script");
    scriptBody.type = "text/javascript";

  }
}
