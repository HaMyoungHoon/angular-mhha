import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MqttTestComponent} from "./mqtt-test.component";
import {MqttTestRoutingModule} from "./mqtt-test-routing.module";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";



@NgModule({
  declarations: [MqttTestComponent],
  imports: [
    CommonModule, MqttTestRoutingModule, FormsModule, Button, DropdownModule, AdvertisementComponent
  ]
})
export class MqttTestModule { }
