import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {NotfoundRoutingModule} from "./notfound-routing.module";
import {ButtonModule} from "primeng/button";
import {NotfoundComponent} from "./notfound.component";



@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule, NotfoundRoutingModule, ButtonModule
  ]
})
export class NotfoundModule { }
