import {Component, EventEmitter, Inject, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {Editor, EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {DOCUMENT} from "@angular/common";
import {FDialogService} from "../../../services/common/f-dialog.service";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-quill',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.scss'
})
export class QuillComponent {
  @ViewChild("quillEditor") quillEditor!: Editor;
  editorData: any;
  @Output() htmlValue: EventEmitter<string>;
  htmlBuff: string;

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any,
              private fDialogService: FDialogService) {
    this.htmlValue = new EventEmitter<string>();
    this.htmlBuff = "";
  }

  editorChange(event: any): void {
    this.htmlValue.emit(event.htmlValue);
    this.htmlBuff = event.htmlValue;
  }
  setQuillText(data: string | undefined): void {
    if (data === undefined) {
      return;
    }

    this.quillEditor.quill.setText("");
    this.quillEditor.quill.clipboard.dangerouslyPasteHTML(0, data);
    this.htmlBuff = data;
  }
  openHtmlEditor(): void {
    this.fDialogService.openHtmlEdit({
      header: "html editor",
      width: "75%",
      height: "75%",
      modal: true,
      closable: true,
      closeOnEscape: false,
      data: {
        htmlValue: this.htmlBuff
      }
    }).subscribe((data: string | undefined) => {
      this.setQuillText(data);
    });
  }
  quillOnInit(data: any): void {
    const quill = document.getElementById("quillEditor")?.getElementsByClassName("ql-toolbar");
    if (quill === undefined || quill.length <= 0) {
      return;
    }
    const toolbar = quill[0];
    const codeBlock = toolbar.getElementsByClassName("ql-code-block");
    if (codeBlock !== undefined && codeBlock.length > 0) {
      codeBlock[0].remove();
    }

    const htmlButton = this.document.createElement("button");
    htmlButton.type = "button";
    htmlButton.ariaLabel = "html";
    htmlButton.classList.add("pi");
    htmlButton.classList.add("pi-code");
    htmlButton.addEventListener("click", () => {
      this.document.getElementById("htmlButton")?.click();
    });

    toolbar.lastChild?.appendChild(htmlButton);

//    this.quillEditor.quill.register('modules/imageResize')
  }
}
