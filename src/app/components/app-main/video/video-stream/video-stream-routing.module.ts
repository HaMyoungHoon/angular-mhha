import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {VideoStreamComponent} from "./video-stream.component";



@NgModule({
  imports: [RouterModule.forChild([{ path:'', component: VideoStreamComponent }])],
  exports: [RouterModule]
})
export class VideoStreamRoutingModule { }
