import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {BokListComponent} from "./bok-list.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: BokListComponent }])],
  exports: [RouterModule]
})
export class BokListRoutingModule { }
