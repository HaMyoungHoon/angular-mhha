import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import * as FConstants from "../../../guards/f-constants";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {AngularCommonService} from "../../../services/rest/angular-common.service";
import {FDialogService} from "../../../services/common/f-dialog.service";

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
  protected readonly MAIN_URL = `${FConstants.MAIN_URL}/${FConstants.DASHBOARD_URL}`;
  constructor(private router: Router, private angularCommonService: AngularCommonService, private dialogService: FDialogService) {
  }

  notYetLink() {
    this.dialogService.warn('click', '아직 안만듦');
  }
  test(): void {
  }
}
