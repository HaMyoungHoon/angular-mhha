import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {PdfConvertComponent} from "./pdf-convert.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PdfConvertComponent }])],
  exports: [RouterModule]
})
export class PdfConvertRoutingModule { }
