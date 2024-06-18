import {Component, Input} from "@angular/core";
import {BokStatisticTableRow} from "../../../../../models/rest/bok/bok-statistic-table-row";
import {BokService} from "../../../../../services/rest/bok.service";
import {FDialogService} from "../../../../../services/common/f-dialog.service";
import {BokStatisticTableListRequest} from "../../../../../models/rest/bok/bok-statistic-table-list-request";
import {BokStatisticItemRow} from "../../../../../models/rest/bok/bok-statistic-item-row";
import {TableModule} from "primeng/table";

@Component({
  selector: "app-bok-table-sub",
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: "./bok-table-sub.component.html",
  styleUrl: "./bok-table-sub.component.scss"
})
export class BokTableSubComponent {
  loading: boolean;
  row?: BokStatisticTableRow
  @Input() reqData!: BokStatisticTableListRequest;
  itemRows: BokStatisticItemRow[];
  endOfList: string;

  constructor(private bokService: BokService, private fDialogService: FDialogService) {
    this.itemRows = [];
    this.loading = false;
    this.endOfList = "";
  }

  getTableItem(row: BokStatisticTableRow | undefined): void {
    this.row = row;
    if (this.row === undefined) {
      return;
    }
    this.reqData.code = this.row.STAT_CODE;

    this.loading = true;
    this.bokService.getStatisticTableItem(this.reqData).then(x => {
      if (x.StatisticItemList) {
        this.endOfList = `${x.StatisticItemList.list_total_count ?? 0}`;
        this.itemRows = x.StatisticItemList.row;
      }
      if (x.RESULT) {
        this.fDialogService.warn(x.RESULT.CODE ?? "", x.RESULT.RESULT);
      }
      this.loading = false;
    }).catch(x => {
      this.fDialogService.error("getTableItem", x.message);
      this.loading = false;
    });
  }
}
