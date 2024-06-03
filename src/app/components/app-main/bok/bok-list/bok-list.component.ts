import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';
import {TreeNode} from "primeng/api";
import {BokService} from "../../../../services/rest/bok.service";
import {BokStatisticTableListRequest} from "../../../../models/rest/bok/bok-statistic-table-list-request";
import {BokStatisticTableRow} from "../../../../models/rest/bok/bok-statistic-table-row";
import {reportUnhandledError} from "rxjs/internal/util/reportUnhandledError";
import {FDialogService} from "../../../../services/common/f-dialog.service";

@Component({
  selector: 'app-bok-list',
  templateUrl: './bok-list.component.html',
  styleUrl: './bok-list.component.scss'
})
export class BokListComponent {
  loading: boolean;
  reqData: BokStatisticTableListRequest;
  endOfList: number;
  treeNode: TreeNode<BokStatisticTableRow>[];
  constructor(private bokService: BokService, private fDialogService: FDialogService, private cd: ChangeDetectorRef) {
    this.loading = true;
    this.reqData = new class implements BokStatisticTableListRequest {
      authKey = "sample";
      langType = "kr";
      startNumber = 1;
      endNumber = 10;
    };
    this.endOfList = 1000;
    this.treeNode = [];
    this.initNode();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  initNode(): void {
//    this.getTableData();
  }
  getTableData(): void {
    this.loading = true;
    this.bokService.getStatisticTableList(this.reqData).then(x => {
      this.loading = false;
      this.endOfList = x.StatisticTableList?.list_total_count ?? 0;
      if (x.StatisticTableList?.row !== undefined) {
        this.addTree(x.StatisticTableList?.row);
      }
      if (x.RESULT) {
        this.fDialogService.warn(x.RESULT.CODE ?? "", x.RESULT.RESULT);
      }
    }).catch(x => {
      this.loading = false;
      this.fDialogService.error("getTable", x.message);
    });
  }
  addTree(row: BokStatisticTableRow[]): void {
    row.forEach(x => {
      const treeItem = this.convertRowToTree(x);
      if (x.P_STAT_CODE === "*") {
        if (this.treeNode.filter(y => y.data?.STAT_CODE === x.STAT_CODE).length > 0) {
          return;
        }

        this.treeNode.push(treeItem);
      } else {
        const parent = this.findChild(this.treeNode, x.P_STAT_CODE);
        if (parent === undefined) {
          return;
        }
        if (parent.children === undefined) {
          parent.children = [];
        }
        if (parent.children?.filter(y => y.data?.STAT_NAME === x.STAT_CODE).length > 0) {
          return;
        }

        treeItem.parent = parent;
        parent.children.push(treeItem);
      }
    });
    this.cd.detectChanges();
  }
  findChild(treeNode: (TreeNode<BokStatisticTableRow> | undefined)[] | undefined, pStatCode: string): TreeNode<BokStatisticTableRow> | undefined {
    if (treeNode === undefined || treeNode.length <= 0) {
      return undefined;
    }
    let parent = treeNode.filter(x => x?.data?.STAT_CODE === pStatCode);
    if (parent === undefined || parent.length <= 0) {
      const child = treeNode.flatMap(x => x?.children);
      if (child.length == 1 && child[0] === undefined) {
        return undefined;
      }

      return this.findChild(child, pStatCode);
    }

    return parent[0];
  }
  convertRowToTree(row: BokStatisticTableRow): TreeNode<BokStatisticTableRow> {
    return new class implements TreeNode<BokStatisticTableRow> {
      checked = false;
      label = row.STAT_NAME;
      data = row;
      icon = "pi pi-fw";
    };
  }

  get startNumberClass(): string {
    if (this.reqData.startNumber > this.reqData.endNumber) {
      return "ng-invalid";
    }
    if (this.reqData.startNumber.toString().length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get endNumberClass(): string {
    if (this.reqData.endNumber < this.reqData.startNumber) {
      return "ng-invalid";
    }
    if (this.reqData.endNumber.toString().length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get searchDisable(): boolean {
    if (this.reqData.authKey.length <= 0) {
      return true;
    }
    if (this.reqData.langType.length <= 0) {
      return true;
    }
    if (this.reqData.startNumber > this.reqData.endNumber) {
      return true;
    }
    if (this.reqData.startNumber.toString().length <= 0) {
      return true;
    }
    if (this.reqData.endNumber.toString().length <= 0) {
      return true;
    }

    return false;
  }
  nodeSelect(event: any): void {
    if (event.node.data.SRCH_YN !== "Y") {
      return;
    }
  }
  gotoBOK(): void {
    window.open("https://ecos.bok.or.kr/api/#/DevGuide/StatisticalCodeSearch", "_blank");
  }
}
