import {afterNextRender, AfterViewInit, ChangeDetectorRef, Component, Inject, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import * as FConstants from "../../../../guards/f-constants";
declare let google:any;
declare global {
  interface Window {
    initMap: (data: any) => Promise<void>;
  }
}

@Component({
  selector: "app-map-google",
  templateUrl: "./map-google.component.html",
  styleUrl: "./map-google.component.scss"
})
export class MapGoogleComponent implements AfterViewInit {
  map: any;
  position = { lat: 37.5020656, lng: 126.8880897 };
  infoWindow: any;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef) {
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    window.initMap = this.initMap;
    this.injectScriptsGoogleMap();
    this.cd.detectChanges();
  }
  async initMap(data: any): Promise<void> {
    this.map = new google.maps.Map(document.getElementById("map-view"), {
      center: this.position,
      zoom: 13,
    });

    this.infoWindow = new google.maps.InfoWindow({
      content: `${this.position}`,
      position: this.position
    });
    this.map.addListener("click", (x: any): void => {
      this.mapClick(x);
    });
  }
  injectScriptsGoogleMap(): void {
    const scriptBody = this.renderer.createElement("script");
    scriptBody.src = `https://maps.googleapis.com/maps/api/js?key=${FConstants.MAP_GOOGLE_API_KEY}&loading=async&callback=initMap`;
    scriptBody.async = true;
    this.renderer.appendChild(this.document.getElementById("map-view"), scriptBody);
  }
  async mapClick(data: any): Promise<void> {
    this.position = data.latLng;
    this.infoWindow?.close();
    this.infoWindow = new google.maps.InfoWindow({
      content: `<div class="card flex">${this.position}</div>`,
      position: this.position,
      shadowStyle: 1,
      color: "var(--primary-color-text);"
    });
    this.infoWindow?.open(this.map);
    console.log(data);
  }
}
