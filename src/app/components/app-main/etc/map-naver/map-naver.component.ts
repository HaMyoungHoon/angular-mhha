import {afterNextRender, AfterViewInit, ChangeDetectorRef, Component, Inject, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import * as FConstants from "../../../../guards/f-constants";
import * as FExtensions from "../../../../guards/f-extentions";
declare global {
  interface Window {
    fDialogService: any;
    initNaverMap: (data: any) => Promise<void>;
    naverMapClick: (data: any) => Promise<void>;
    getNaverReverseGeocoder: (lat: number, lng: number,func: (status: any, response: any) => void) => void;
    MarkerClustering: () => void;
    addNaverMarkers: (lat: number, lng: number) => void;
    naverMarkerClick: (data: any) => void;
    addNaverInfoWindow: (lat: number, lng: number, content: string) => void;
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
export class MapNaverComponent implements AfterViewInit {
  mapLoadTimeout: number = 0;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef, private fDialogService: FDialogService) {
    window.fDialogService = this.fDialogService;
    window.naver = undefined;
    this.injectScriptsNaverMap();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    window.initNaverMap = this.initNaverMap;
    window.naverMapClick = this.naverMapClick;
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
    this.initNaverMap().then();
  }
  injectScriptsNaverMap(): void {
    if (this.document.getElementById("naver-maps-script") !== null) {
      return;
    }
    const scriptBody = this.renderer.createElement("script");
    scriptBody.id = "naver-maps-script";
    scriptBody.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${FConstants.MAP_NAVER_CLIENT_ID}&submodules=geocoder`;
    scriptBody.async = true;
    this.renderer.appendChild(this.document.head, scriptBody);
    const scriptMarkerClustering = this.renderer.createElement("script");
    scriptMarkerClustering.src = "/assets/js/MarkerClustering.js";
    this.renderer.appendChild(this.document.head, scriptMarkerClustering);
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
    const mapView = this.document.getElementById("map-view");
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
      window.naverMapClick(x).then(x => {

      });
    });
    const htmlMarkers = this.htmlNaverClusterMarker;
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
        try {
          const firstCluster = clusterMarker.getElement().firstElementChild;
          if (firstCluster) {
            firstCluster.textContent = count;
          }
        } catch (e: any) {
        }
      }
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
    window.naverMap.setCenter(window.getNaverLatLng(data.coords.latitude, data.coords.longitude));
  }
  onErrorGeolocation(): void {
//    window.fDialogService.warn('location', "not allow current location");
  }
  async naverMapClick(data: any): Promise<void> {
    const lat = data.coord.y;
    const lng = data.coord.x;
    window.getNaverReverseGeocoder(lat, lng, (status: any, response: any): void => {
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
        <label>(${lat}, ${lng})</label>
    </div>
    <div class="naver-info-body flex-row">${bodyContent}</div>
</div>`;
      window.addNaverMarkers(lat, lng);
      window.addNaverInfoWindow(lat, lng, infoContent);
    });
  }
  addNaverMarkers(lat: number, lng: number): void {
    const marker = new window.naver.maps.Marker({
      position: window.getNaverLatLng(lat, lng),
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
  addNaverInfoWindow(lat: number, lng: number, content: string): void {
    const infoWindow = new window.naver.maps.InfoWindow({
      position: window.getNaverLatLng(lat, lng),
      content: content
    });
    infoWindow.open(window.naverMap);
    window.naverInfoWindow.push(infoWindow);
  }
  naverInfoTimesClick(data: any): void {
  }
  getNaverReverseGeocoder(lat: number, lng: number, func: (status: any, response: any) => void): void {
    const latLng = window.getNaverLatLng(lat, lng);
    try {
      window.naver.maps.Service.reverseGeocode({ coords: latLng }, function(status: any, response: any): void {
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
}
