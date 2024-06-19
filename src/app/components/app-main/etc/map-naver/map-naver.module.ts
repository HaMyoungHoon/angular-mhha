import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MapNaverComponent} from "./map-naver.component";
import {MapNaverRoutingModule} from "./map-naver-routing.module";



@NgModule({
  declarations: [MapNaverComponent],
  imports: [
    CommonModule, MapNaverRoutingModule
  ]
})
export class MapNaverModule { }
