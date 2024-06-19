import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MapGoogleComponent} from "./map-google.component";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";
import {MapGoogleRoutingModule} from "./map-google-routing.module";
import {Button} from "primeng/button";



@NgModule({
  declarations: [MapGoogleComponent],
  imports: [
    CommonModule, MapGoogleRoutingModule, AdvertisementComponent, Button
  ]
})
export class MapGoogleModule { }
