import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WriteBoardComponent} from "./write-board.component";
import {WriteBoardRoutingModule} from "./write-board-routing.module";
import {SafeHtmlPipe} from "../../../../guards/safe-html.pipe";
import {AdvertisementComponent} from "../../../common/advertisement/advertisement.component";
import {AccordionModule} from "primeng/accordion";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ListboxModule} from "primeng/listbox";



@NgModule({
  declarations: [WriteBoardComponent],
  imports: [
    CommonModule, WriteBoardRoutingModule, SafeHtmlPipe, AdvertisementComponent, AccordionModule, DropdownModule, FormsModule, ListboxModule
  ]
})
export class WriteBoardModule { }
