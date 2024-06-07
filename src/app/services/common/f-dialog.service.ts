import {Injectable} from '@angular/core';
import {ToastItem} from "../../models/common/toast-item";
import {ToastLevel} from "../../models/common/toast-level";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {FDialogComponent} from "../../components/common/f-dialog/f-dialog.component";
import {SignDialogComponent} from "../../components/common/sign-dialog/sign-dialog.component";
import {Observable} from "rxjs";
import {TableDialogComponent} from "../../components/common/table-dialog/table-dialog.component";
import {TableDialogColumn} from "../../models/common/table-dialog-column";
import {HtmlEditDialogComponent} from "../../components/common/html-edit-dialog/html-edit-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class FDialogService {
  ref?: DynamicDialogRef
  constructor(private dialogService: DialogService, private messageService: MessageService) {
  }

  openDialog(): void {
    this.ref = this.dialogService.open(FDialogComponent, {

    });
  }
  openSignIn(): Observable<any> {
    this.ref = this.dialogService.open(SignDialogComponent, {
      header: 'sign in',
      modal: false,
      closable: false,
      closeOnEscape: false,
    });

    return this.ref.onClose;
  }
  openTable(config: DynamicDialogConfig): Observable<any> {
    this.ref = this.dialogService.open(TableDialogComponent, config);
    return this.ref.onClose;
  }
  openHtmlEdit(config: DynamicDialogConfig): Observable<any> {
    this.ref = this.dialogService.open(HtmlEditDialogComponent, config);
    return this.ref.onClose;
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
