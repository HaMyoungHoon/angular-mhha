import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {MapGoogleComponent} from "./map-google.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: "", component: MapGoogleComponent }])],
  exports: [RouterModule]
})
export class MapGoogleRoutingModule { }
