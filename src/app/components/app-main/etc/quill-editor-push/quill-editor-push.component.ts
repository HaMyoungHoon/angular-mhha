import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';
import {getLocalStorage, isExpired} from "../../../../guards/amhohwa";
import * as FConstants from "../../../../guards/f-constants";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {WriteDirectory} from "../../../../models/rest/write/write-directory";
import {TreeNode} from "primeng/api";
import {WriteFile} from "../../../../models/rest/write/write-file";
import {AngularWriteService} from "../../../../services/rest/angular-write.service";

@Component({
  selector: 'app-quill-editor-push',
  templateUrl: './quill-editor-push.component.html',
  styleUrl: './quill-editor-push.component.scss'
})
export class QuillEditorPushComponent {
  viewPage: boolean
  editorData: any;
  treeNode: TreeNode<WriteDirectory>[];
  selectedDir?: WriteDirectory;
  writeFile: WriteFile
  constructor(private cd: ChangeDetectorRef, private fDialogService: FDialogService, private angularWriteService: AngularWriteService) {
    this.viewPage = false;
    this.treeNode = [];
    this.writeFile = new class implements WriteFile {
      name = "";
    }
    this.initPage();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  initPage(): void {
    const authToken = getLocalStorage(FConstants.AUTH_TOKEN);
    if (isExpired(authToken)) {
      this.openSignIn();
      return;
    }

    this.viewPage = true;
    this.initEditor();
  }
  initEditor(): void {
    this.angularWriteService.getWriteDir().then(x => {
      if (x.result) {
        this.treeNode = this.convertTreeNode(x.data);
        return;
      }
      this.fDialogService.error('init', x.msg);
    }).catch(x => {
      this.fDialogService.error('init catch', x.message);
    });
  }

  openSignIn(): void {
    this.fDialogService.openSignIn().subscribe(() => {
      this.closeSignIn();
    });
  }
  closeSignIn(): void {
    const authToken = getLocalStorage(FConstants.AUTH_TOKEN);
    if (isExpired(authToken)) {
      return;
    }

    this.viewPage = true;
    this.initEditor();
    this.cd.detectChanges();
  }
  editorChange(event: any): void {
    this.writeFile.content = event.htmlValue;
    this.cd.detectChanges();
  }
  convertTreeNode(data: WriteDirectory[] | undefined): TreeNode<WriteDirectory>[] {
    if (data === undefined) {
      return [];
    }

    const ret: TreeNode<WriteDirectory>[] = [];
    data.forEach(x => {
      const buff: TreeNode<WriteDirectory> = new class implements TreeNode<WriteDirectory> {
        label = x.dirName;
        data = x;
        icon = "pi pi-folder";
        children: TreeNode<WriteDirectory>[] = [];
      };
      buff.children = this.convertTreeNode(x.children);

      ret.push(buff)
    });

    return ret;
  }
  nodeSelect(event: any): void {
    this.selectedDir = event.node.data;
  }
  loadFile(): void {
    this.angularWriteService.getWriteFileAll().then(x => {
      if (x.result) {
        console.log(x.data);
        return;
      }
      this.fDialogService.warn('loadFile', x.msg);
    }).catch(x => {
      this.fDialogService.error('loadFile catch', x.message);
    });
  }

  get canFilter(): boolean {
    return this.treeNode.length > 0;
  }
  get postDisable(): boolean {
    if (this.selectedDir === undefined) {
      return true;
    }
    if (this.writeFile.name.length <= 0) {
      return true;
    }

    return false;
  }
}
