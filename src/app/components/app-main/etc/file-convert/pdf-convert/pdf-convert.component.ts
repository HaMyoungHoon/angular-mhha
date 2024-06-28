import {afterNextRender, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {AspService} from "../../../../../services/rest/asp.service";
import {FDialogService} from "../../../../../services/common/f-dialog.service";
import * as FConstants from "../../../../../guards/f-constants";
import {DownloadFileModel} from "../../../../../models/rest/file/download-file-model";
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {FileUploadModule} from "primeng/fileupload";
import {BadgeModule} from "primeng/badge";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-pdf-convert',
  standalone: true,
  imports: [FileUploadModule, BadgeModule, ProgressSpinnerModule, FloatLabelModule, InputTextModule, ReactiveFormsModule, FormsModule, NgIf, NgForOf],
  templateUrl: './pdf-convert.component.html',
  styleUrl: './pdf-convert.component.scss'
})
export class PdfConvertComponent {
  maxFileSize: number = 10 * FConstants.KILO * FConstants.KILO;
  isUploading: boolean = false;
  downloadFiles: DownloadFileModel[] = [];
  pdfPassword: string | undefined = undefined;
  constructor(@Inject(DOCUMENT) private document: Document, private cd: ChangeDetectorRef,
              private aspService: AspService, private fDialogService: FDialogService) {
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  upload(event: any, chooseCallback: any): void {
    chooseCallback();
  }
  downloadFile(data: DownloadFileModel): void {
    const buff = this.document.createElement("A") as HTMLAnchorElement;
    if (data.url) {
      buff.href = data.url;
    } else {
      return;
    }
    if (data.orgFileName) {
      buff.download = data.orgFileName;
    }
    this.document.body.appendChild(buff);
    buff.click();
    this.document.body.removeChild(buff);
  }
  removeFile(data: DownloadFileModel): void {
    this.downloadFiles = this.downloadFiles.filter(x => x != data);
  }
  onSelectFile(event: any): void {
    const file = event.currentFiles[0];
    this.isUploading = true;
    this.aspService.pdfToWord(file, this.pdfPassword).subscribe(x => {
      this.isUploading = false;
      x.body.text().then((y: any): void => {
        try {
          this.fDialogService.warn('warn', JSON.parse(y).msg);
        } catch (_: any) {
          this.downloadFiles.push(new DownloadFileModel().parseHttpResponse(x));
        }
      });
    });
  }

  formatSize(bytes: any): string {
    const fractionDigits = 3
    const sizes : string[] = FConstants.FILE_SIZE_TYPES;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i : number = Math.floor(Math.log(bytes) / Math.log(FConstants.KILO));
    const formattedSize : number = parseFloat((bytes / Math.pow(FConstants.KILO, i)).toFixed(fractionDigits));

    return `${formattedSize} ${sizes[i]}`;
  }

  get dragDropEnable(): boolean {
    return !this.isUploading;
  }
}
