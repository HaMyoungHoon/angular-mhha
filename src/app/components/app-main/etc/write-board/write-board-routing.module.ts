import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {WriteBoardComponent} from "./write-board.component";


@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: WriteBoardComponent }])],
  exports: [RouterModule]
})
export class WriteBoardRoutingModule { }
