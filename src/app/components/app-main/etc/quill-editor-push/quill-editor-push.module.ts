import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {QuillEditorPushComponent} from "./quill-editor-push.component";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {SafeHtmlPipe} from "../../../../guards/safe-html.pipe";
import {QuillEditorPushRoutingModule} from "./quill-editor-push-routing.module";
import {TreeModule} from "primeng/tree";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {QuillComponent} from "../../../common/quill/quill.component";



@NgModule({
  declarations: [QuillEditorPushComponent],
    imports: [
        CommonModule, QuillEditorPushRoutingModule, EditorModule, FormsModule, SafeHtmlPipe, TreeModule, FloatLabelModule, InputTextModule, ButtonModule, QuillComponent
    ]
})
export class QuillEditorPushModule { }
