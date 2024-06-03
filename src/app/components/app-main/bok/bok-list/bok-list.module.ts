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
import {BokTableComponent} from "./bok-table/bok-table.component";
import {BokTableSearchComponent} from "./bok-table-search/bok-table-search.component";
import {BokTableSubComponent} from "./bok-table-sub/bok-table-sub.component";



@NgModule({
  declarations: [BokListComponent],
  imports: [
    CommonModule, BokListRoutingModule, TreeModule, InputTextModule, FormsModule, TableModule, FloatLabelModule, ButtonModule, BokTableComponent, BokTableSearchComponent, BokTableSubComponent
  ]
})
export class BokListModule { }
