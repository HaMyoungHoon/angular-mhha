import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MapKakaoComponent} from "./map-kakao.component";
import {MapKakaoRoutingModule} from "./map-kakao-routing.module";



@NgModule({
  declarations: [MapKakaoComponent],
  imports: [
    CommonModule, MapKakaoRoutingModule
  ]
})
export class MapKakaoModule { }
