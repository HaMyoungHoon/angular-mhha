import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MapNaverComponent} from "./map-naver.component";
import {MapNaverRoutingModule} from "./map-naver-routing.module";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ListboxModule} from "primeng/listbox";
import {CheckboxModule} from "primeng/checkbox";



@NgModule({
  declarations: [MapNaverComponent],
  imports: [
    CommonModule, MapNaverRoutingModule, AdvertisementComponent, Button, IconFieldModule, InputIconModule, InputTextModule, PaginatorModule, ListboxModule, CheckboxModule
  ]
})
export class MapNaverModule { }
