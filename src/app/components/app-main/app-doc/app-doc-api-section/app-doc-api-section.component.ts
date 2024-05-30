import {Component, Input} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AngularCommonService} from "../../../../services/rest/angular-common.service";
import {DocPage} from "../../../../models/doc/DocPage";
import {MessageService} from "primeng/api";
import {IRestResult} from "../../../../models/rest/IRestResult";

@Component({
  selector: 'app-app-doc-api-section',
  imports: [],
  templateUrl: './app-doc-api-section.component.html'
})
export class AppDocApiSectionComponent {
  @Input() header: string;
  @Input() docs: any[];
  _docs: any[];
  apiDoc?: DocPage[] | null = null;
  constructor(private location: Location, private router: Router, private angularCommonService: AngularCommonService, private messageService: MessageService) {
    this.header = "";
    this.docs = [];
    this._docs = [];
    this.angularCommonService.getDocPage().then(x => {
      console.log(x);
      if (x.Result) {
        this.apiDoc = x.Data
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'getDocPage',
          detail: x.Msg ?? ""
        });
      }
    }).catch(y => {
      console.log(y);
      this.messageService.add({
        severity: 'error',
        summary: 'getDocPage catch',
        detail: y.message
      });
    });
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
      let module = this.apiDoc
    }

    return newDocs.filter((doc) => !doc.isInterface);
  }
}
