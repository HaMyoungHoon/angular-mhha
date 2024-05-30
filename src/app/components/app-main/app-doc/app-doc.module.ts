import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppDocSectionComponent} from "./app-docsection/app-doc-section.component";
import {AppDocSectionTextComponent} from "./app-doc-section-text/app-doc-section-text.component";
import {AppDocApiTableComponent} from "./app-doc-api-table/app-doc-api-table.component";
import {AppDocApiSectionComponent} from "./app-doc-api-section/app-doc-api-section.component";
import {AppDocSectionNavComponent} from "./app-doc-section-nav/app-doc-section-nav.component";



@NgModule({
  declarations: [
    AppDocSectionComponent,
    AppDocSectionTextComponent,
    AppDocApiTableComponent,
    AppDocApiSectionComponent,
    AppDocSectionNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppDocSectionComponent,
    AppDocSectionTextComponent,
    AppDocApiTableComponent,
    AppDocApiSectionComponent,
    AppDocSectionNavComponent
  ]
})
export class AppDocModule { }
