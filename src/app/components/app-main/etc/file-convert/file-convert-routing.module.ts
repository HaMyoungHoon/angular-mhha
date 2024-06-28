import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {FileConvertComponent} from "./file-convert.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: FileConvertComponent }])],
  exports: [RouterModule]
})
export class FileConvertRoutingModule { }
