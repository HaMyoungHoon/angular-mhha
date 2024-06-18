import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {MapNaverComponent} from "./map-naver.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: "", component: MapNaverComponent }])],
  exports: [RouterModule]
})
export class MapNaverRoutingModule { }
