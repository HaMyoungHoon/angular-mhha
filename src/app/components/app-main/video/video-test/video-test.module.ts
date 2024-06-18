import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoTestComponent} from "./video-test.component";
import {VideoTestRoutingModule} from "./video-test-routing.module";
import {SafeUrlPipe} from "../../../../guards/safe-url.pipe";



@NgModule({
  declarations: [VideoTestComponent],
  imports: [
    CommonModule, VideoTestRoutingModule, SafeUrlPipe
  ]
})
export class VideoTestModule { }
