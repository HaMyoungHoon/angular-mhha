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
import {FDialogService} from "../../../../services/common/f-dialog.service";
import * as FConstants from "../../../../guards/f-constants";
import * as FExtensions from "../../../../guards/f-extentions";
import {debounceTime, Subject, Subscription} from "rxjs";
declare global {
  interface Window {
    getNaverReverseGeocoder: (coordinate: any, func: (status: any, response: any) => void) => void;
    MarkerClustering: () => void;
    addNaverMarkers: (coordinate: any) => void;
    naverMarkerClick: (data: any) => void;
    addNaverInfoWindow: (coordinate: any, content: string) => void;
    naverInfoTimesClick: (data: any) => void;
    getNaverLatLng: (lat: number, lng: number) => any;
    naverMap: any;
    naver: any;
    naverMarkers: any[];
    naverMarkerClustering: any;
    naverInfoWindow: any[];
    naverLat: number;
    naverLng: number;
    clusterMarkerBuff: any;
  }
}

@Component({
  selector: "app-map-naver",
  templateUrl: "./map-naver.component.html",
  styleUrl: "./map-naver.component.scss"
})
export class MapNaverComponent implements AfterViewInit, OnDestroy {
  mapLoadTimeout: number = 0;
  isSearchResultRoad: boolean = false;
  searchLoading: boolean = false;
  searchValue: string = "";
  searchSubject: Subject<string> = new Subject<string>();
  searchObserver?: Subscription;
  searchDebounceTime: number = 1000;
  addressList: any[] = [];
  selectedAddress: any;
  prevAddress: any;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef, private fDialogService: FDialogService) {
    window.fDialogService = this.fDialogService;
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    window.getNaverReverseGeocoder = this.getNaverReverseGeocoder;
    window.addNaverMarkers = this.addNaverMarkers;
    window.naverMarkerClick = this.naverMarkerClick;
    window.addNaverInfoWindow = this.addNaverInfoWindow;
    window.naverInfoTimesClick = this.naverInfoTimesClick;
    window.getNaverLatLng = this.getNaverLatLng;
    window.naverMarkers = [];
    window.naverInfoWindow = [];
    window.naverLat = FExtensions.defLat;
    window.naverLng = FExtensions.defLng;
    this.initNaverMap().then((_: void): void => {
      this.initClusterMarker();
    });
    this.initSearch();
  }
  ngOnDestroy(): void {
  }

  async initNaverMap(data: any = undefined): Promise<void> {
    this.mapLoadTimeout = 0;
    while (window.naver === undefined) {
      await FExtensions.awaitDelay(1000);
      if (this.mapLoadTimeout > 10) {
        break;
      }
      this.mapLoadTimeout++;
    }
    if (window.naver === undefined) {
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onSuccessGeolocation, this.onErrorGeolocation);
    }
    const mapView = this.document.getElementById("naver-map-view");
    const mapOptions = {
      useStyleMap: true,
      center: window.getNaverLatLng(FExtensions.defLat, FExtensions.defLng),
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_LEFT,
        style: window.naver.maps.ZoomControlStyle.SMALL
      }
    };
    window.naverMap = new window.naver.maps.Map(mapView, mapOptions);
    window.naver.maps.Event.addListener(window.naverMap, "click", (x: any): void => {
      this.naverMapClick(x).then(x => {

      });
    });
  }
  initClusterMarker(): void {
    const htmlMarkers = this.htmlNaverClusterMarker;
    try {
      // @ts-ignore
      window.naverMarkerClustering = new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 11,
        map: window.naverMap,
        markers: window.naverMarkers,
        disableClickZoom: false,
        gridSize: 120,
        icons: [htmlMarkers[0], htmlMarkers[1], htmlMarkers[2], htmlMarkers[3], htmlMarkers[4]],
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: function(clusterMarker: any, count: any): void {
          const firstCluster = clusterMarker.getElement().firstElementChild;
          if (firstCluster) {
            firstCluster.textContent = count;
          }
        }
      });
    } catch (e: any) {
      this.fDialogService.error('marker', e.message);
    }
  }
  initSearch(): void {
    this.searchObserver = this.searchSubject.pipe(debounceTime(this.searchDebounceTime))
      .subscribe((x) => {
        this.searchLoading = false;
        if (x) {
          this.searchValue += x;
        }
        this.searchAddress();
      });
  }

  async onSuccessGeolocation(data: any): Promise<void> {
    await FExtensions.awaitDelay(1000);
    if (window.naver === undefined) {
      return;
    }
    if (window.naverMap === null) {
      return;
    }
    window.naverLat = data.coords.latitude;
    window.naverLng = data.coords.longitude;
    window.naverMap.panTo(window.getNaverLatLng(data.coords.latitude, data.coords.longitude));
  }
  onErrorGeolocation(): void {
//    window.fDialogService.warn('location', "not allow current location");
  }
  async naverMapClick(data: any): Promise<void> {
    window.getNaverReverseGeocoder(data.coord, (status: any, response: any): void => {
      if (status !== window.naver.maps.Service.Status.OK) {
        if (response) {
          window.fDialogService.warn("reverse geocoder", response.v2.status.message);
        } else {
          window.fDialogService.warn("reverse geocoder", status.toString());
        }
        return;
      }

      let bodyContent = "";
      if (response.v2.address.jibunAddress.length > 0) {
        bodyContent += `<div class="flex">${response.v2.address.jibunAddress}</div>`;
      }
      if (response.v2.address.roadAddress.length > 0) {
        bodyContent += `<div class="flex">${response.v2.address.roadAddress}</div>`;
      }

      const infoContent = `
<div class="naver-info-window-container">
    <!--
    <p-button class="naver-info-header-times" (click)="window.naverInfoTimesClick($event)">
        <span class="pi pi-times"></span>
    </p-button>
    -->
    <div class="naver-info-header">
        <label>(${data.coord.y}, ${data.coord.x})</label>
    </div>
    <div class="naver-info-body flex-row">${bodyContent}</div>
</div>`;
      window.addNaverMarkers(data.coord);
      window.addNaverInfoWindow(data.coord, infoContent);
    });
  }
  addNaverMarkers(coordinate: any): void {
    const marker = new window.naver.maps.Marker({
      position: coordinate,
      draggable: false,
    });
    window.naver.maps.Event.addListener(marker, "click", (x: any): void => {
      window.naverMarkerClick(x)
    });
    marker.setMap(window.naverMap);
    window.naverMarkers.push(marker);
  }
  naverMarkerClick(data: any): void {
    try {
      const markerBuff = window.naverMarkers.find(x => x._nmarker_id == data.overlay._nmarker_id);
      if (markerBuff === undefined || markerBuff === null) {
        return;
      }

      const infoWindow = window.naverInfoWindow.find((x: any) => x.position.x == markerBuff.position.x && x.position.y == markerBuff.position.y);
      if (infoWindow === null || infoWindow === undefined) {
        return;
      }
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(window.naverMap);
      }
    } catch (e: any) {
      window.fDialogService.error('marker click', e.message);
    }
  }
  addNaverInfoWindow(coordinate: any, content: string): void {
    const infoWindow = new window.naver.maps.InfoWindow({
      position: coordinate,
      content: content
    });
    infoWindow.open(window.naverMap);
    window.naverInfoWindow.push(infoWindow);
  }
  naverInfoTimesClick(data: any): void {
  }
  getNaverReverseGeocoder(coordinate: any, func: (status: any, response: any) => void): void {
    try {
      window.naver.maps.Service.reverseGeocode({
        coords: coordinate,
        orders: [
          window.naver.maps.Service.OrderType.ADDR,
          window.naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(",")
      }, function(status: any, response: any): void {
        func(status, response);
      });
    } catch (e: any) {
      window.fDialogService.warn("reverse geocoder", e.message);
    }
  }
  getNaverLatLng(lat: number, lng: number): any {
    return new window.naver.maps.LatLng(lat, lng);
  }
  get htmlNaverClusterMarker(): any {
    return [
      {
        content: '<div class="naver-map-cluster-marker marker1"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20)
      },
      {
        content: '<div class="naver-map-cluster-marker marker2"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20)
      },
      {
        content: '<div class="naver-map-cluster-marker marker3"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20)
      },
      {
        content: '<div class="naver-map-cluster-marker marker4"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20)
      },
      {
        content: '<div class="naver-map-cluster-marker marker5"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20)
      }
    ]
  }

  naverZoomControlOnOff(data: any): void {
    window.naverMap.zoomControl.getElement().classList.toggle("collapse-element");
  }
  markerClear(data: any): void {
    window.naverMarkers.forEach(x => {
      x.setMap();
    });
    window.naverMarkers = [];
    window.naverInfoWindow = [];
    window.naverMarkerClustering.markers.forEach((x: any) => {
      x.setMap();
    });
    window.naverMarkerClustering.markers = [];
  }
  searchChange(data: any): void {
    this.searchLoading = true;
    this.searchSubject.next(data.data);
  }
  searchAddress(): void {
    if (this.searchValue.length <= 0) {
      this.addressList = [];
      return;
    }

    try {
      window.naver.maps.Service.geocode({ query: this.searchValue}, (status: any, response: any) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          if (response) {
            window.fDialogService.warn("reverse geocoder", response.v2.status.message);
          } else {
            window.fDialogService.warn("reverse geocoder", status.toString());
          }
          return;
        }

        this.addressList = response.v2.addresses;
        if (this.addressList.length <= 0) {
          this.fDialogService.warn('search', "count : 0");
        }
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
      window.naverMap.panTo(window.getNaverLatLng(this.selectedAddress.y, this.selectedAddress.x));
      window.naverMap.setZoom(14);
    }
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
  get searchStyle(): string {
    if (this.searchLoading) return "pi pi-spinner pi-spin";
    else return "pi pi-search";
  }
  get searchResultLabel(): string {
    if (this.isSearchResultRoad) return "roadAddress";
    return "jibunAddress";
  }
}
