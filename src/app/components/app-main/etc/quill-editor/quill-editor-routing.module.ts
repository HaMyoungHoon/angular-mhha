import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuillEditorComponent} from "./quill-editor.component";

@NgModule({
  imports: [RouterModule.forChild([{ path: "", component: QuillEditorComponent }])],
  exports: [RouterModule]
})
export class QuillEditorRoutingModule { }
