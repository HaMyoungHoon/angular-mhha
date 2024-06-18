import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {MapKakaoComponent} from "./map-kakao.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: "", component: MapKakaoComponent }])],
  exports: [RouterModule]
})
export class MapKakaoRoutingModule { }
