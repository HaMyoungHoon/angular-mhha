import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';
import {FloatLabelModule} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {FDialogService} from "../../../services/common/f-dialog.service";
import {AspService} from "../../../services/rest/asp.service";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {setLocalStorage} from "../../../guards/amhohwa";
import * as FConstants from "../../../guards/f-constants";

@Component({
  selector: 'app-sign-dialog',
  standalone: true,
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './sign-dialog.component.html',
  styleUrl: './sign-dialog.component.scss'
})
export class SignDialogComponent {
  id: string;
  pw: string;
  constructor(private cd: ChangeDetectorRef, private fDialogService: FDialogService,
              private ref: DynamicDialogRef, private aspService: AspService) {
    this.id = "";
    this.pw = "";
    afterNextRender(() => {
      this.cd.markForCheck();
    })
  }

  signIn(): void {
    this.aspService.signIn(this.id, this.pw).then(x => {
      if (x.result) {
        setLocalStorage(FConstants.AUTH_TOKEN, x.data ?? "");
        this.ref.close();
        return;
      }

      this.fDialogService.warn("signIn", x.msg);
    }).catch(x => {
      this.fDialogService.error("signIn catch", x.message);
    })
  }

  get signInDisable(): boolean {
    if (this.id.length <= 0) {
      return true
    }
    if (this.pw.length <= 0) {
      return true
    }

    return false
  }
}
