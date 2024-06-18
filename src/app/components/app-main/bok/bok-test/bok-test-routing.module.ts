import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {BokTestComponent} from "./bok-test.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: "", component: BokTestComponent }])],
  exports: [RouterModule]
})
export class BokTestRoutingModule { }
