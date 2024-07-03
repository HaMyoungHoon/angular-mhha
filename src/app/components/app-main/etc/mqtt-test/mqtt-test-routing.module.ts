import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MqttTestComponent} from "./mqtt-test.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: MqttTestComponent }])],
  exports: [RouterModule]
})
export class MqttTestRoutingModule { }
