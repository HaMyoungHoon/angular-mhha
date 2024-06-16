import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoResourceComponent} from "./video-resource.component";
import {VideoResourceRoutingModule} from "./video-resource-routing.module";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {InputIconModule} from "primeng/inputicon";
import {IconFieldModule} from "primeng/iconfield";
import {ListboxModule} from "primeng/listbox";
import {SkeletonModule} from "primeng/skeleton";



@NgModule({
  declarations: [VideoResourceComponent],
  imports: [
    CommonModule, VideoResourceRoutingModule, AdvertisementComponent, FloatLabelModule, InputTextModule, FormsModule, InputIconModule, IconFieldModule, ListboxModule, SkeletonModule
  ]
})
export class VideoResourceModule { }
