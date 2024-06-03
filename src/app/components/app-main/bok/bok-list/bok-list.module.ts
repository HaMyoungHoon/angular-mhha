import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BokListComponent} from "./bok-list.component";
import {BokListRoutingModule} from "./bok-list-routing.module";
import {TreeModule} from "primeng/tree";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {FloatLabelModule} from "primeng/floatlabel";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [BokListComponent],
  imports: [
    CommonModule, BokListRoutingModule, TreeModule, InputTextModule, FormsModule, TableModule, FloatLabelModule, ButtonModule
  ]
})
export class BokListModule { }
