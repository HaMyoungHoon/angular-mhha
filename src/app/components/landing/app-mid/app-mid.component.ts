import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DASHBOARD_URL} from "../../../guards/f-constants";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {AngularCommonService} from "../../../services/rest/angular-common.service";
import {DocPage} from "../../../models/doc/DocPage";
import {IRestResult} from "../../../models/rest/IRestResult";

@Component({
  selector: 'app-app-mid',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    NgIf
  ],
  templateUrl: './app-mid.component.html'
})
export class AppMidComponent {
  @Output() messageEvent = new EventEmitter<{severity: string, summary: string, detail: string}>();
  protected readonly DASHBOARD_URL = DASHBOARD_URL;
  constructor(private router: Router, private angularCommonService: AngularCommonService) {
  }

  notYetLink() {
    this.messageEvent.emit({
      severity: 'warn',
      summary: 'href',
      detail: '아직 안만듦'
    });
  }
  test(): void {
    this.angularCommonService.getDocPage().then(x => {
      if (x.Result) {
        console.log(x);
      } else {
        this.messageEvent.emit({
          severity: 'error',
          summary: 'getDocPage',
          detail: x.Msg ?? ""
        });
      }
    }).catch(y => {
      console.log(y);
      this.messageEvent.emit({
        severity: 'error',
        summary: 'getDocPage Catch',
        detail: y.message
      });
    });
  }
}
