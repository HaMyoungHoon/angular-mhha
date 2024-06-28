import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PdfConvertComponent} from "./pdf-convert.component";
import {PdfConvertRoutingModule} from "./pdf-convert-routing.module";
import {FileUploadModule} from "primeng/fileupload";
import {BadgeModule} from "primeng/badge";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [PdfConvertComponent],
  imports: [
    CommonModule, PdfConvertRoutingModule, FileUploadModule, BadgeModule, ProgressSpinnerModule, FloatLabelModule, InputTextModule, ReactiveFormsModule, FormsModule
  ]
})
export class PdfConvertModule { }
