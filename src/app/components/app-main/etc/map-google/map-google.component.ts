import {afterNextRender, AfterViewInit, ChangeDetectorRef, Component, Inject, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import * as FConstants from "../../../../guards/f-constants";
import * as FExtensions from "../../../../guards/f-extentions";
import {FDialogService} from "../../../../services/common/f-dialog.service";
declare global {
  interface Window {
    fDialogService: any;
    googleInitMap: (data: any) => Promise<void>;
    googleMapClick: (data: any) => Promise<void>;
    googleSetGeocoder: () => Promise<void>;
    googleOpenInfoWindow: (data: string, position: any) => Promise<void>;
    googleSetMarker: (content: string) => Promise<void>;
    google: any;
    googleMap: any;
    googleGeocoder: any;
    googlePosition: { lat: number, lng: number };
    googleInfoWindow: any;
    googleMarker: any[];
    googleDefTheme: any;
  }
}

@Component({
  selector: "app-map-google",
  templateUrl: "./map-google.component.html",
  styleUrl: "./map-google.component.scss"
})
export class MapGoogleComponent implements AfterViewInit {
  marker: any[] = [];
  selectedTheme: any;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef, private fDialogService: FDialogService) {
    window.fDialogService = this.fDialogService;
    window.googlePosition = FExtensions.defPosition;
    this.selectedTheme = this.googleThemeList[3];
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    window.googleInitMap = this.googleInitMap;
    window.googleMapClick = this.googleMapClick;
    window.googleSetGeocoder = this.googleSetGeocoder;
    window.googleOpenInfoWindow = this.googleOpenInfoWindow;
    window.googleSetMarker = this.googleSetMarker;
    this.injectScriptsGoogleMap();
    this.cd.detectChanges();
  }
  async googleInitMap(data: any): Promise<void> {
    window.googleMap = new window.google.maps.Map(document.getElementById("map-view"), {
      center: window.googlePosition,
      zoom: 13,
//      mapId: FConstants.MAP_ID,
      styles: this.nightTheme
    });
    window.googleGeocoder = new window.google.maps.Geocoder();
    window.googleInfoWindow = new window.google.maps.InfoWindow({
      content: `${window.googlePosition}`,
      position: window.googlePosition
    });
    window.googleMap.addListener("click", (x: any): void => {
      this.googleMapClick(x);
    });
  }
  injectScriptsGoogleMap(): void {
    const scriptBody = this.renderer.createElement("script");
    scriptBody.src = `https://maps.googleapis.com/maps/api/js?key=${FConstants.MAP_GOOGLE_API_KEY}&loading=async&callback=googleInitMap&libraries=marker`;
    scriptBody.async = true;
    scriptBody.defer = true;
    this.renderer.appendChild(this.document.getElementById("map-view"), scriptBody);
    const scriptGeocoder = this.renderer.createElement("script");
    scriptGeocoder.src = `https://maps.googleapis.com/maps/api/geocode/json?key=${FConstants.MAP_GOOGLE_API_KEY}`;
    scriptGeocoder.async = true;
    this.renderer.appendChild(this.document.getElementById("map-view"), scriptGeocoder);
  }
  async googleMapClick(data: any): Promise<void> {
    window.googlePosition = data.latLng;
    await this.googleSetGeocoder();
  }
  async googleSetGeocoder(): Promise<void> {
    await window.googleGeocoder.geocode({location: window.googlePosition,}).then((x: any) => {
      let geoResult = "";
      let skip = 0;
      x.results.forEach((y: any) => {
        if (skip < 3) {
          geoResult += `<div class="flex">${y.formatted_address}</div>`;
        }
        skip++;
      });

      const infoContent = `
<div id="content" class="card flex-row">
    <div id="siteNotice"></div>
    <h5 id="firstHeading" class="firstHeading">${window.googlePosition}</h5>
    <div id="bodyContent" class="card flex-row">
        ${geoResult}
    </div>
</div>`;
      this.googleSetMarker(infoContent);
      this.googleOpenInfoWindow(infoContent);
      return infoContent;
    }).catch((x: any) => {
      this.fDialogService.error("geocoder", x);
    });
  }
  async googleOpenInfoWindow(content: string, position: any = undefined): Promise<void> {
    let positionBuff = position;
    if (position === undefined) {
      positionBuff = window.googlePosition;
    }
    try {
      window.googleInfoWindow?.close();
      window.googleInfoWindow = new window.google.maps.InfoWindow({
        content: content,
        position: positionBuff
      });
      window.googleInfoWindow?.open(window.googleMap);
    } catch (e: any) {
      this.fDialogService.error("open info", e);
    }
  }
  async googleSetMarker(content: string): Promise<void> {
    const map = window.googleMap;
    try {
      const markerBuff = new window.google.maps.Marker({
        title: "mhha",
        position: window.googlePosition,
        map
      });
//      const markerBuff = new google.maps.marker.AdvancedMarkerElement({
//        title: "mhha",
//        position: this.position,
//        map
//      });
      markerBuff.addListener("click", (x: any): void => {
        this.googleOpenInfoWindow(content, markerBuff.position);
      });

      this.marker.push(markerBuff);
    } catch (e: any) {
      this.fDialogService.error("marker", e);
    }
  }

  clearMarker(data: any): void {
    try {
      this.marker.forEach(x => {
        x.setMap(null);
      });
      this.marker = [];
    } catch (e: any) {
      this.fDialogService.error("clear marker", e);
    }
  }

  themeSelectionChange(data: any): void {
    window.googleMap.setOptions({ styles: this.selectedTheme.func });
  }
  get googleThemeList(): any {
    return [
      {
        label: "standard",
        func: this.standardTheme,
      },
      {
        label: "dark",
        func: this.darkTheme,
      },
      {
        label: "retro",
        func: this.retroTheme,
      },
      {
        label: "night",
        func: this.nightTheme,
      },
      {
        label: "aubergine",
        func: this.aubergineTheme,
      }
    ];
  }

  get standardTheme(): any {
    return FConstants.googleStandardTheme();
  }
  get darkTheme(): any {
    return FConstants.googleDarkTheme();
  }
  get retroTheme(): any {
    return FConstants.googleRetroTheme();
  }
  get nightTheme(): any {
    return FConstants.googleNightTheme();
  }
  get aubergineTheme(): any {
    return FConstants.googleAubergineTheme();
  }
}
