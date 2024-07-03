import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';
import {AngularWriteService} from "../../../../services/rest/angular-write.service";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {WriteDirectory} from "../../../../models/rest/write/write-directory";
import {WriteFile} from "../../../../models/rest/write/write-file";

@Component({
  selector: 'app-write-board',
  templateUrl: './write-board.component.html',
  styleUrl: './write-board.component.scss'
})
export class WriteBoardComponent {
  etcDir?: WriteDirectory
  selectDir?: WriteDirectory
  writeData?: WriteFile
  constructor(private cd: ChangeDetectorRef, private angularWriteService: AngularWriteService, private fDialogService: FDialogService) {
    this.init();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  init(): void {
    this.angularWriteService.getWriteDirNameFiles("ETC").then(x => {
      if (x.result) {
        this.etcDir = x.data;
        this.setFirstChild();
        return;
      }
      this.fDialogService.warn('init', x.msg);
    }).catch(x => {
      this.fDialogService.error('init', x.message);
    });
  }

  setFirstChild(): void {
    if (this.etcDir === undefined) {
      return;
    }

    if (this.etcDir.children === undefined) {
      return;
    }

    this.etcDir.children = this.etcDir.children.filter(y => y.writeFiles && y.writeFiles.length > 0);
    this.selectDir = this.etcDir.children[0];
    if (this.etcDir.children[0].writeFiles === undefined) {
      return;
    }

    this.selectWriteDataIndex(this.etcDir.children[0].writeFiles[0].thisIndex);
    this.cd.detectChanges();
  }

  selectWriteDataEvent(data: any): void {
    if (data.value === null) {
      return;
    }
    this.selectWriteDataIndex(data.value.thisIndex);
  }
  selectWriteDataIndex(index: number): void {
    if (this.writeData?.thisIndex === index) {
      return;
    }

    this.angularWriteService.getWriteFileIndex(index).then(x => {
      if (x.result) {
        this.writeData = x.data;
        return;
      }
      this.fDialogService.warn('select file', x.msg);
    }).catch(x => {
      this.fDialogService.error('select file', x.message);
    });
  }
  selectWriteDir(data: any): void {
  }
}
