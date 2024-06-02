import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {NotYetComponent} from "./not-yet.component";



@NgModule({
  imports: [
    RouterModule.forChild([{path:'', component: NotYetComponent}])
  ],
  exports: [RouterModule]
})
export class NotYetRoutingModule { }
