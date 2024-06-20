import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MapNaverComponent} from "./map-naver.component";
import {MapNaverRoutingModule} from "./map-naver-routing.module";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";
import {Button} from "primeng/button";



@NgModule({
  declarations: [MapNaverComponent],
  imports: [
    CommonModule, MapNaverRoutingModule, AdvertisementComponent, Button
  ]
})
export class MapNaverModule { }
