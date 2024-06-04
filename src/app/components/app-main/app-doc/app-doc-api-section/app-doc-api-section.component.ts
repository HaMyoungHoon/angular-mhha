import {Component, Input} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AngularCommonService} from "../../../../services/rest/angular-common.service";
import {DocPage} from "../../../../models/doc/DocPage";
import {FDialogService} from "../../../../services/common/f-dialog.service";

@Component({
  selector: 'app-app-doc-api-section',
  imports: [],
  templateUrl: './app-doc-api-section.component.html'
})
export class AppDocApiSectionComponent {
  @Input() header: string;
  @Input() docs: DocPage[];
  apiDoc: DocPage[];
  constructor(private location: Location, private router: Router, private angularCommonService: AngularCommonService, private fDialogService: FDialogService) {
    this.header = "";
    this.docs = []
    this.apiDoc = []
    this.angularCommonService.getDocPage().then(x => {
      if (x.result) {
        this.apiDoc = x.data ?? []
      } else {
        this.fDialogService.error('getDocPage', x.msg);
      }
    }).catch(y => {
      this.fDialogService.error('getDocPage catch', y.message);
    });
  }

  createDocs(): any[] {
    const newDocs: any[] = [];
    for (const docName of this.docs) {
      const moduleName = docName.name.toLowerCase();
      if (!this.apiDoc) {
        continue;
      }

      let module = this.apiDoc.filter(x => x.name.toLowerCase() == moduleName)[0]
      let newDoc = {
        id: `api.${module.name.toLowerCase()}`,
      }
    }

    return newDocs.filter((doc) => !doc.isInterface);
  }
}
