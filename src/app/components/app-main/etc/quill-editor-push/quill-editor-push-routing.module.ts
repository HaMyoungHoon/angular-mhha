import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {QuillEditorPushComponent} from "./quill-editor-push.component";



@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: QuillEditorPushComponent }])],
  exports: [RouterModule]
})
export class QuillEditorPushRoutingModule { }
