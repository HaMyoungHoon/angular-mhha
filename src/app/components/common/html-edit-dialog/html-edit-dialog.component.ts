import { Component } from "@angular/core";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {SafeHtmlPipe} from "../../../guards/safe-html.pipe";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";

@Component({
  selector: "app-html-edit-dialog",
  standalone: true,
  imports: [
    SafeHtmlPipe,
    FormsModule,
    ButtonModule
  ],
  templateUrl: "./html-edit-dialog.component.html",
  styleUrl: "./html-edit-dialog.component.scss"
})
export class HtmlEditDialogComponent {
  htmlValue: string;
  constructor(private ref: DynamicDialogRef, private dialogService: DialogService) {
    const dlg = this.dialogService.getInstance(ref);
    this.htmlValue = dlg.data.htmlValue;
  }

  submit(): void {
    this.ref.close(this.htmlValue);
  }
}
