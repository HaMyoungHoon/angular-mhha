import {afterNextRender, AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import * as FConstants from "../../../../guards/f-constants";
import * as FExtensions from "../../../../guards/f-extentions";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {debounceTime, Subject, Subscription} from "rxjs";
declare global {
  interface Window {
    fDialogService: any;
    googleInitMap: (data: any) => Promise<void>;
    googleMapClick: (data: any) => Promise<void>;
    googleSetReverseGeocoder: () => Promise<void>;
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
export class MapGoogleComponent implements AfterViewInit, OnDestroy {
  mapLoadTimeout: number = 0;
  googleMarker: any[] = [];
  selectedTheme: any;
  searchLoading: boolean = false;
  searchValue: string = "";
  searchSubject: Subject<string> = new Subject<string>();
  searchObserver?: Subscription;
  searchDebounceTime: number = 1000;
  addressList: any[] = [];
  selectedAddress: any;
  prevAddress: any;
  isMobile: boolean = false;
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
    window.googleSetReverseGeocoder = this.googleSetReverseGeocoder;
    window.googleOpenInfoWindow = this.googleOpenInfoWindow;
    window.googleSetMarker = this.googleSetMarker;
    window.googleMarker = this.googleMarker;
    this.googleInitMap().then((_: void): void => {
      this.cd.detectChanges();
    });
    this.initSearch();
    this.isMobile = !navigator.userAgent.includes("Window");
  }
  ngOnDestroy(): void {

  }

  async googleInitMap(): Promise<void> {
    this.mapLoadTimeout = 0;
    while (window.google === undefined) {
      await FExtensions.awaitDelay(1000);
      if (this.mapLoadTimeout > 10) {
        break;
      }
      this.mapLoadTimeout++;
    }
    if (window.google === undefined) {
      return;
    }

    window.googleMap = new window.google.maps.Map(document.getElementById("google-map-view"), {
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
    await FExtensions.awaitDelay(1000);
  }
  initSearch(): void {
    this.searchObserver = this.searchSubject.pipe(debounceTime(this.searchDebounceTime))
      .subscribe((x) => {
        this.searchLoading = false;
        this.searchAddress();
      });
  }

  async googleMapClick(data: any): Promise<void> {
    window.googlePosition = data.latLng;
    await this.googleSetReverseGeocoder();
  }
  async googleSetReverseGeocoder(): Promise<void> {
    await window.googleGeocoder.geocode({ location: window.googlePosition }).then((x: any) => {
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

      this.googleMarker.push(markerBuff);
    } catch (e: any) {
      this.fDialogService.error("marker", e);
    }
  }

  clearMarker(data: any): void {
    try {
      this.googleMarker.forEach(x => {
        x.setMap(null);
      });
      this.googleMarker = [];
    } catch (e: any) {
      this.fDialogService.error("clear marker", e);
    }
  }
  searchChange(data: any): void {
    if (this.isMobile) {
      this.searchLoading = true;
      this.searchSubject.next(data.data);
      return;
    }

    if (data.key == 'Enter') {
      this.searchLoading = true;
      this.searchSubject.next(data.data);
    }
  }
  searchAddress(): void {
    if (this.searchValue.length <= 0) {
      this.addressList = [];
      return;
    }

    try {
      window.googleGeocoder.geocode({ address: this.searchValue }).then((x: any) => {
        this.addressList = x.results;
      }).catch((x: any) => {
        this.fDialogService.warn('search', x.message);
      });
    } catch (e: any) {
      this.fDialogService.error('search', e.message);
    }
  }
  selectAddressList(data: any): void {
    if (this.selectedAddress === undefined) {
      this.selectedAddress = this.prevAddress;
    }

    this.prevAddress = this.selectedAddress;
    if (this.selectedAddress) {
      window.googleMap.fitBounds(this.selectedAddress.geometry.bounds);
      window.googleMap.setZoom(15);
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
  get searchStyle(): string {
    if (this.searchLoading) return "pi pi-spinner pi-spin";
    else return "pi pi-search";
  }
  get mapViewContainerStyle(): string {
    if (this.addressList && this.addressList.length > 0) {
      return "map-view-container-active";
    }
    return "map-view-container";
  }
  get addressListContainerStyle(): string {
    if (this.addressList && this.addressList.length > 0) {
      return "address-list-container-active";
    }
    return "address-list-container";
  }
}
