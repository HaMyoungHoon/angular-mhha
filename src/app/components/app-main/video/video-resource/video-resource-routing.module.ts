import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {VideoResourceComponent} from "./video-resource.component";



@NgModule({
  imports: [RouterModule.forChild([{ path:"", component: VideoResourceComponent }])],
  exports: [RouterModule]
})
export class VideoResourceRoutingModule { }
