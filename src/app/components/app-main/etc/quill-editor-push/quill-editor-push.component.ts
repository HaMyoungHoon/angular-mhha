import {afterNextRender, ChangeDetectorRef, Component, ViewChild} from "@angular/core";
import {getLocalStorage, isExpired} from "../../../../guards/amhohwa";
import * as FConstants from "../../../../guards/f-constants";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {WriteDirectory} from "../../../../models/rest/write/write-directory";
import {TreeNode} from "primeng/api";
import {WriteFile} from "../../../../models/rest/write/write-file";
import {AngularWriteService} from "../../../../services/rest/angular-write.service";
import {TableDialogColumn} from "../../../../models/common/table-dialog-column";
import {QuillComponent} from "../../../common/quill/quill.component";

@Component({
  selector: "app-quill-editor-push",
  templateUrl: "./quill-editor-push.component.html",
  styleUrl: "./quill-editor-push.component.scss"
})
export class QuillEditorPushComponent {
  @ViewChild("quillEditor") quillEditor!: QuillComponent;
  viewPage: boolean = false;
  treeNode: TreeNode<WriteDirectory>[] = [];
  selectedNode?: TreeNode<WriteDirectory>;
  selectedDir?: WriteDirectory;
  writeFile: WriteFile = new WriteFile();
  isLoaded: boolean = false;
  constructor(private cd: ChangeDetectorRef, private fDialogService: FDialogService, private angularWriteService: AngularWriteService) {
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
      this.fDialogService.error("init", x.msg);
    }).catch(x => {
      this.fDialogService.error("init catch", x.message);
    });
  }
  setQuillText(data: string | undefined): void {
    this.quillEditor.setQuillText(data);
  }
  setContent(data: any): void {
    this.writeFile.content = data;
  }

  openSignIn(): void {
    this.fDialogService.openSignIn().subscribe(() => {
      this.closeSignIn();
    });
  }
  openTable(data: WriteFile[] | undefined): void {
    if (data === undefined) {
      return;
    }
    const col: TableDialogColumn[] = [];
    col.push(new TableDialogColumn().build("name", "file name"));
    col.push(new TableDialogColumn().build("content", "file content"))

    this.fDialogService.openTable({
      header: "files",
      modal: true,
      closable: true,
      closeOnEscape: false,
      data: {
        cols: col,
        tableData: data
      }
    }).subscribe((data: WriteFile | undefined) => {
      this.closeTable(data)
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
  closeTable(data: WriteFile | undefined): void {
    if (data === undefined) {
      return;
    }

    const dir = this.treeNode.flatMap(x => x.children).filter(x => x?.data?.thisIndex == data?.writeDirectoryThisIndex);
    if (dir.length > 0) {
      this.selectedDir = dir[0]?.data;
      this.selectedNode = dir[0];
    }

    this.writeFile = data;
    this.setQuillText(data.content);
    this.isLoaded = true;
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
    if (this.isLoaded) {
      return;
    }

    this.selectedDir = event.node.data;
  }
  loadFile(): void {
    this.angularWriteService.getWriteFileAll().then(x => {
      if (x.result) {
        this.openTable(x.data);
        return;
      }
      this.fDialogService.warn("loadFile", x.msg);
    }).catch(x => {
      this.fDialogService.error("loadFile catch", x.message);
    });
  }
  loadClose(): void {
    this.selectedDir = undefined;
    this.selectedNode = undefined;
    this.writeFile.name = "";
    this.setQuillText("");
    this.isLoaded = false;
  }
  postFile(): void {
    if (this.isLoaded) {
      this.angularWriteService.editWriteFile(this.writeFile?.name ?? "", this.writeFile.content ?? "").then(x => {
        if (x.result) {
          this.loadClose();
          return;
        }
        this.fDialogService.warn("edit file", x.msg);
      }).catch(x => {
        this.fDialogService.error("edit file catch", x.message);
      });
      return;
    }

    this.angularWriteService.postWriteFile(this.selectedDir?.dirName ?? "", this.writeFile).then(x => {
      if (x.result) {
        this.loadClose();
        return;
      }
      this.fDialogService.warn("post file", x.msg);
    }).catch(x => {
      this.fDialogService.error("post file catch", x.message);
    });
  }

  get treeSelectionMode(): "single" | "multiple" | "checkbox" | null | undefined {
    if (this.isLoaded) {
      return null;
    }
    return "single";
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
