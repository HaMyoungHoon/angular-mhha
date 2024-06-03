import {afterNextRender, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {SharedModule, TreeNode} from "primeng/api";
import {TreeModule} from "primeng/tree";
import {BokStatisticTableListRequest} from "../../../../../models/rest/bok/bok-statistic-table-list-request";
import {BokStatisticTableRow} from "../../../../../models/rest/bok/bok-statistic-table-row";
import {BokService} from "../../../../../services/rest/bok.service";
import {FDialogService} from "../../../../../services/common/f-dialog.service";

@Component({
  selector: 'app-bok-table',
  standalone: true,
  imports: [
    NgIf,
    SharedModule,
    TreeModule
  ],
  templateUrl: './bok-table.component.html',
  styleUrl: './bok-table.component.scss'
})
export class BokTableComponent {
  loading: boolean;
  @Input() reqData!: BokStatisticTableListRequest;
  @Output() selectRow: EventEmitter<BokStatisticTableRow | undefined>;
  endOfList: number;
  treeNode: TreeNode<BokStatisticTableRow>[];
  constructor(private bokService: BokService, private fDialogService: FDialogService) {
    this.loading = false;
    this.selectRow = new EventEmitter<BokStatisticTableRow | undefined>();
    this.endOfList = 1000;
    this.treeNode = [];
  }

  getTableData(): void {
    this.loading = true;
    this.bokService.getStatisticTableList(this.reqData).then(x => {
      this.loading = false;
      this.endOfList = x.StatisticTableList?.list_total_count ?? 0;
      if (x.StatisticTableList) {
        this.addTree(x.StatisticTableList.row);
      }
      if (x.RESULT) {
        this.fDialogService.warn(x.RESULT.CODE ?? "", x.RESULT.RESULT);
      }
    }).catch(x => {
      this.loading = false;
      this.fDialogService.error("getTableData", x.message);
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

  nodeSelect(event: any): void {
    if (event.node.data.SRCH_YN !== "Y") {
      return;
    }

    this.selectRow.emit(event.node.data);
  }

  get canFilter(): boolean {
    return this.treeNode.length > 0;
  }
}
