import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MapGoogleComponent} from "./map-google.component";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";
import {MapGoogleRoutingModule} from "./map-google-routing.module";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {ListboxModule} from "primeng/listbox";



@NgModule({
  declarations: [MapGoogleComponent],
  imports: [
    CommonModule, MapGoogleRoutingModule, AdvertisementComponent, Button, DropdownModule, FormsModule, IconFieldModule, InputIconModule, InputTextModule, CheckboxModule, ListboxModule
  ]
})
export class MapGoogleModule { }
