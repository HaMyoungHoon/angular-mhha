import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrl: './quill-editor.component.scss'
})
export class QuillEditorComponent {
  editorData: any;
  htmlValue: string;
  constructor(private cd: ChangeDetectorRef) {
    this.htmlValue = "";
    afterNextRender(() => {
      this.cd.markForCheck();
    })
  }

  editorChange(event: any): void {
    this.htmlValue = event.htmlValue;
    this.cd.detectChanges();
  }
}
