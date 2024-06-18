import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {VideoStreamComponent} from "./video-stream.component";
import {VideoStreamRoutingModule} from "./video-stream-routing.module";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ListboxModule} from "primeng/listbox";
import {VideoViewComponent} from "../../../common/video-view/video-view.component";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";



@NgModule({
  declarations: [VideoStreamComponent],
  imports: [
    CommonModule, VideoStreamRoutingModule, DropdownModule, FormsModule, ListboxModule, VideoViewComponent, AdvertisementComponent
  ]
})
export class VideoStreamModule { }
