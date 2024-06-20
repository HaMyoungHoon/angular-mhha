import {afterNextRender, ChangeDetectorRef, Component} from "@angular/core";
import {AngularWriteService} from "../../../services/rest/angular-write.service";

@Component({
  selector: "app-dash-board",
  templateUrl: "./dash-board.component.html",
  styleUrl: "./dash-board.component.scss"
})
export class DashBoardComponent {
  history: string = "";
  constructor(private cd: ChangeDetectorRef, private angularWriteService: AngularWriteService) {
    this.init();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  init(): void {
    this.angularWriteService.getWriteFile("History").then(x => {
      if (x.result) {
        this.history = x.data?.content ?? "";
        this.cd.detectChanges();
      }
    }).catch(x => {

    });
  }
}
