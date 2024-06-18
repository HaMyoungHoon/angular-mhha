import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {VideoTestComponent} from "./video-test.component";
import {VideoTestRoutingModule} from "./video-test-routing.module";
import {SafeUrlPipe} from "../../../../guards/safe-url.pipe";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [VideoTestComponent],
    imports: [
        CommonModule, VideoTestRoutingModule, SafeUrlPipe, ButtonModule
    ]
})
export class VideoTestModule { }
