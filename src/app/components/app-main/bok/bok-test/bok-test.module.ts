import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {BokTestComponent} from "./bok-test.component";
import {BokTestRoutingModule} from "./bok-test-routing.module";



@NgModule({
  declarations: [BokTestComponent],
  imports: [
    CommonModule, BokTestRoutingModule
  ]
})
export class BokTestModule { }
