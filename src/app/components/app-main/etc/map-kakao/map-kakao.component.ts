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
import * as FExtensions from "../../../../guards/f-extentions";
declare global {
  interface Window {
    kakaoMap: any;
    kakao: any;
  }
}
@Component({
  selector: "app-map-kakao",
  templateUrl: "./map-kakao.component.html",
  styleUrl: "./map-kakao.component.scss"
})
export class MapKakaoComponent implements AfterViewInit, OnDestroy {
  mapLoadTimeout: number = 0;
  searchLoading: boolean = false;
  searchValue: string = "";
  addressList: any[] = [];
  selectedAddress: any;
  prevAddress: any;
  isMobile: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef, private fDialogService: FDialogService) {
    window.fDialogService = this.fDialogService;
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.initKakaoMap().then((_: void): void => {
    });
  }
  ngOnDestroy(): void {
  }

  async initKakaoMap(): Promise<void> {
    this.mapLoadTimeout = 0;
    while (window.kakao === undefined) {
      await FExtensions.awaitDelay(1000);
      if (this.mapLoadTimeout > 10) {
        break;
      }
      this.mapLoadTimeout++;
    }
    if (window.kakao === undefined) {
      return;
    }

    try {
      this.mapLoadTimeout = 0;
      const mapView = this.document.getElementById("kakao-map-view");
      const mapOption = {
        center: new window.kakao.maps.LatLng(FExtensions.defLat, FExtensions.defLng),
        level: 5
      };
      console.log(mapView);
      window.kakaoMap = new window.kakao.maps.Map(mapView, mapOption);
      const zoomControl = new window.kakao.maps.ZoomControl();
      window.kakaoMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    } catch (e: any) {
      this.fDialogService.warn('init map', e.message);
      console.log(e.message);
    }
  }


  get mapViewContainerStyle(): string {
    if (this.addressList && this.addressList.length > 0) {
      return "map-view-container-active";
    }
    return "map-view-container";
  }
}
