import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MapGoogleComponent} from "./map-google.component";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";
import {MapGoogleRoutingModule} from "./map-google-routing.module";



@NgModule({
  declarations: [MapGoogleComponent],
  imports: [
    CommonModule, MapGoogleRoutingModule, AdvertisementComponent
  ]
})
export class MapGoogleModule { }
