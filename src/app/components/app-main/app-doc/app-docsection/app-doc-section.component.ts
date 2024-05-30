import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DocModel} from "../../../../models/common/doc-model";

@Component({
  selector: 'app-app-doc-section',
  imports: [],
  templateUrl: './app-doc-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocSectionComponent {
  @Input() docs: DocModel[];
  @Input() apiDocs: any[];
  constructor() {
    this.docs = [];
    this.apiDocs = [];
  }
  trackById(doc: any): string | undefined {
    return doc.id || undefined;
  }
}
