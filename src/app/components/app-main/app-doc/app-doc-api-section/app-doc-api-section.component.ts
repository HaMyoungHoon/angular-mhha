import {Component, Input} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {DocModel} from "../../../../models/common/doc-model";

@Component({
  selector: 'app-app-doc-api-section',
  imports: [],
  templateUrl: './app-doc-api-section.component.html'
})
export class AppDocApiSectionComponent {
  @Input() header: string;
  @Input() docs: any[];
  _docs: any[];
  constructor(private location: Location, private router: Router) {
    this.header = "";
    this.docs = [];
    this._docs = [];
  }

  getDescription(module: any, docName: string): string {
    if (module.description) {
      return module.description ?? "";
    }
    if (!module.description && module.components && Object.keys(module.components).length) {
      return module.components[docName] && module.components[docName].description ? module.components[docName].description : "";
    }

    return "";
  }
  isInterface(module: any): boolean {
    return module.components && !Object.keys(module.components).length && Object.keys(module.interfaces).indexOf('interfaces') === -1;
  }
  createDocs(): any[] {
    const newDocs: any[] = [];
    for (const docName of this.docs) {
      const moduleName = docName.toLowerCase();
      let module = APIDoc
    }

    return newDocs.filter((doc) => !doc.isInterface);
  }
}
