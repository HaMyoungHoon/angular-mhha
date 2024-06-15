import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoResourceComponent} from "./video-resource.component";
import {VideoResourceRoutingModule} from "./video-resource-routing.module";



@NgModule({
  declarations: [VideoResourceComponent],
  imports: [
    CommonModule, VideoResourceRoutingModule
  ]
})
export class VideoResourceModule { }
