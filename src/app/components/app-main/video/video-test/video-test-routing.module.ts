import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {VideoTestComponent} from "./video-test.component";


@NgModule({
  imports: [RouterModule.forChild([{ path: "", component: VideoTestComponent}])],
  exports: [RouterModule]
})
export class VideoTestRoutingModule { }
