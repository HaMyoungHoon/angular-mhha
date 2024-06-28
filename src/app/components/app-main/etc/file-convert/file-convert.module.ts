import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileConvertComponent} from "./file-convert.component";
import {FileConvertRoutingModule} from "./file-convert-routing.module";
import {PdfConvertComponent} from "./pdf-convert/pdf-convert.component";



@NgModule({
  declarations: [FileConvertComponent],
  imports: [
    CommonModule, FileConvertRoutingModule, PdfConvertComponent
  ]
})
export class FileConvertModule { }
