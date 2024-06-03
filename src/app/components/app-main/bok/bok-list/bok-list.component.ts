import {afterNextRender, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {BokStatisticTableListRequest} from "../../../../models/rest/bok/bok-statistic-table-list-request";
import {BokTableComponent} from "./bok-table/bok-table.component";
import {BokTableSearchComponent} from "./bok-table-search/bok-table-search.component";
import {BokStatisticTableRow} from "../../../../models/rest/bok/bok-statistic-table-row";
import {BokTableSubComponent} from "./bok-table-sub/bok-table-sub.component";

@Component({
  selector: 'app-bok-list',
  templateUrl: './bok-list.component.html',
  styleUrl: './bok-list.component.scss'
})
export class BokListComponent {
  @ViewChild("BokTableSearchComponent") bokTableSearch!: BokTableSearchComponent;
  @ViewChild("BokTableComponent") bokTable!: BokTableComponent;
  @ViewChild("BokTableSubComponent") bokTableSub!: BokTableSubComponent;
  bokTableReqData: BokStatisticTableListRequest
  bokItemReqData: BokStatisticTableListRequest
  constructor(private cd: ChangeDetectorRef) {
    this.bokTableReqData = new BokStatisticTableListRequest();
    this.bokItemReqData = new BokStatisticTableListRequest();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }
  getTableData(): void {
    this.bokTable.getTableData();
  }
  gotoBOK(): void {
    window.open("https://ecos.bok.or.kr/api/#/DevGuide/StatisticalCodeSearch", "_blank");
  }
  setBokTableRow(row: BokStatisticTableRow | undefined): void {
    this.bokTableSub.getTableItem(row);
  }
}
