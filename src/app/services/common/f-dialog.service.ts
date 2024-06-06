import {Injectable} from '@angular/core';
import {ToastItem} from "../../models/common/toast-item";
import {ToastLevel} from "../../models/common/toast-level";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {FDialogComponent} from "../../components/common/f-dialog/f-dialog.component";
import {SignDialogComponent} from "../../components/common/sign-dialog/sign-dialog.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FDialogService {
  dynamicDialogRef?: DynamicDialogRef
  constructor(private dialogService: DialogService, private messageService: MessageService) {
  }

  openDialog(): void {
    this.dynamicDialogRef = this.dialogService.open(FDialogComponent, {

    });
  }
  openSignIn(): Observable<any> {
    this.dynamicDialogRef = this.dialogService.open(SignDialogComponent, {
      header: 'sign in',
      modal: false,
      closable: false,
      closeOnEscape: false,
    });

    return this.dynamicDialogRef.onClose;
  }
  alertToast(data: ToastItem): void {
    this.add(data.level, data.title, data.detail)
  }
  alert(level: ToastLevel, title: string, detail: string): void {
    this.add(level, title, detail);
  }
  warn(title: string, detail?: string): void {
    this.add(ToastLevel.warn, title, detail);
  }
  error(title: string, detail?: string): void {
    this.add(ToastLevel.error, title, detail);
  }
  info(title: string, detail?: string): void {
    this.add(ToastLevel.info, title, detail);
  }
  success(title: string, detail?: string): void {
    this.add(ToastLevel.success, title, detail);
  }

  add(severity: string, title: string, detail?: string): void {
    this.messageService.add({
      severity: severity,
      summary: title,
      detail: detail
    });
  }
}
