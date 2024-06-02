import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotYetComponent} from "./not-yet.component";
import {NotYetRoutingModule} from "./not-yet-routing.module";



@NgModule({
  declarations: [NotYetComponent],
  imports: [
    CommonModule, NotYetRoutingModule
  ]
})
export class NotYetModule { }
