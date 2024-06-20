import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {DashBoardComponent} from "./dash-board.component";
import {DashBoardRoutingModule} from "./dash-board-routing.module";
import {SafeHtmlPipe} from "../../../guards/safe-html.pipe";
import {AdvertisementComponent} from "../../common/advertisement/advertisement.component";



@NgModule({
  declarations: [DashBoardComponent],
  imports: [
    CommonModule, DashBoardRoutingModule, SafeHtmlPipe, AdvertisementComponent
  ]
})
export class DashBoardModule {
}
