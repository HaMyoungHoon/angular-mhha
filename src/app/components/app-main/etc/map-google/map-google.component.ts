import {afterNextRender, AfterViewInit, ChangeDetectorRef, Component, Inject, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import * as FConstants from "../../../../guards/f-constants";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {
  googleAubergineTheme,
  googleNightTheme,
  googleRetroTheme,
  googleStandardTheme,
  MAP_ID
} from "../../../../guards/f-constants";
declare let google:any;
declare global {
  interface Window {
    fDialogService: any;
    initMap: (data: any) => Promise<void>;
    mapClick: (data: any) => Promise<void>;
    setGeocoder: () => Promise<void>;
    openInfoWindow: (data: string, position: any) => Promise<void>;
    setMarker: (content: string) => Promise<void>;
    map: any;
    geocoder: any;
    position: { lat: number, lng: number };
    infoWindow: any;
    marker: any[];
    nightTheme: any;
  }
}

@Component({
  selector: "app-map-google",
  templateUrl: "./map-google.component.html",
  styleUrl: "./map-google.component.scss"
})
export class MapGoogleComponent implements AfterViewInit {
  map: any;
  geocoder: any;
  position = { lat: 37.5020656, lng: 126.8880897 };
  infoWindow: any;
  marker: any[] = [];
  selectedTheme: any;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef, private fDialogService: FDialogService) {
    window.fDialogService = this.fDialogService;
    this.selectedTheme = this.googleThemeList[3];
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    window.initMap = this.initMap;
    window.mapClick = this.mapClick;
    window.setGeocoder = this.setGeocoder;
    window.openInfoWindow = this.openInfoWindow;
    window.setMarker = this.setMarker;
    window.map = this.map;
    window.geocoder = this.geocoder;
    window.position = this.position;
    window.infoWindow = this.infoWindow;
    window.marker = this.marker;
    window.nightTheme = this.nightTheme;
    this.injectScriptsGoogleMap();
    this.cd.detectChanges();
  }
  async initMap(data: any): Promise<void> {
    this.map = new google.maps.Map(document.getElementById("map-view"), {
      center: this.position,
      zoom: 13,
//      mapId: FConstants.MAP_ID,
      styles: this.nightTheme
    });
    this.geocoder = new google.maps.Geocoder();
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
    scriptBody.src = `https://maps.googleapis.com/maps/api/js?key=${FConstants.MAP_GOOGLE_API_KEY}&loading=async&callback=initMap&libraries=marker`;
    scriptBody.async = true;
    scriptBody.defer = true;
    this.renderer.appendChild(this.document.getElementById("map-view"), scriptBody);
    const scriptGeocoder = this.renderer.createElement("script");
    scriptGeocoder.src = `https://maps.googleapis.com/maps/api/geocode/json?key=${FConstants.MAP_GOOGLE_API_KEY}`;
    scriptGeocoder.async = true;
    this.renderer.appendChild(this.document.getElementById("map-view"), scriptGeocoder);
  }
  async mapClick(data: any): Promise<void> {
    this.position = data.latLng;
    await this.setGeocoder();
  }
  async setGeocoder(): Promise<void> {
    await this.geocoder.geocode({location: this.position,}).then((x: any) => {
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
    <h5 id="firstHeading" class="firstHeading">${this.position}</h5>
    <div id="bodyContent" class="card flex-row">
        ${geoResult}
    </div>
</div>`;
      this.setMarker(infoContent);
      this.openInfoWindow(infoContent);
      return infoContent;
    }).catch((x: any) => {
      this.fDialogService.error("geocoder", x);
    });
  }
  async openInfoWindow(content: string, position: any = undefined): Promise<void> {
    let positionBuff = position;
    if (position === undefined) {
      positionBuff = this.position;
    }
    try {
      this.infoWindow?.close();
      this.infoWindow = new google.maps.InfoWindow({
        content: content,
        position: positionBuff
      });
      this.infoWindow?.open(this.map);
    } catch (e: any) {
      this.fDialogService.error("open info", e);
    }
  }
  async setMarker(content: string): Promise<void> {
    const map = this.map;
    try {
      const markerBuff = new google.maps.Marker({
        title: "mhha",
        position: this.position,
        map
      });
//      const markerBuff = new google.maps.marker.AdvancedMarkerElement({
//        title: "mhha",
//        position: this.position,
//        map
//      });
      markerBuff.addListener("click", (x: any): void => {
        this.openInfoWindow(content, markerBuff.position);
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
    window.map.setOptions({ styles: this.selectedTheme.func });
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
