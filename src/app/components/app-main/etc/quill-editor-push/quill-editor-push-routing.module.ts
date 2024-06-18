import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuillEditorPushComponent} from "./quill-editor-push.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: "", component: QuillEditorPushComponent }])],
  exports: [RouterModule]
})
export class QuillEditorPushRoutingModule { }
