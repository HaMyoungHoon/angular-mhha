import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {QuillEditorComponent} from "./quill-editor.component";
import {QuillEditorRoutingModule} from "./quill-editor-routing.module";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {SafeHtmlPipe} from "../../../../guards/safe-html.pipe";



@NgModule({
  declarations: [QuillEditorComponent],
  imports: [
    CommonModule, QuillEditorRoutingModule, EditorModule, FormsModule, SafeHtmlPipe
  ]
})
export class QuillEditorModule { }
