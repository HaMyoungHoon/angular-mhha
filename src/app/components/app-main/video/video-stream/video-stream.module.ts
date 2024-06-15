import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoStreamComponent} from "./video-stream.component";
import {VideoStreamRoutingModule} from "./video-stream-routing.module";



@NgModule({
  declarations: [VideoStreamComponent],
  imports: [
    CommonModule, VideoStreamRoutingModule
  ]
})
export class VideoStreamModule { }
