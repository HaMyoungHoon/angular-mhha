import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  constructor(private cd: ChangeDetectorRef, private domSanitizer: DomSanitizer) {
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }
}
