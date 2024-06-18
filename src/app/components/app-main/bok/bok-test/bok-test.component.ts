import { Component } from "@angular/core";
import {BokService} from "../../../../services/rest/bok.service";
import {BokKeyStatisticRequest} from "../../../../models/rest/bok/bok-key-statistic-request";
import {BokStatisticSearchRequest} from "../../../../models/rest/bok/bok-statistic-search-request";
import {BokStatisticTableListRequest} from "../../../../models/rest/bok/bok-statistic-table-list-request";

@Component({
  selector: "app-bok-test",
  templateUrl: "./bok-test.component.html",
  styleUrl: "./bok-test.component.scss"
})
export class BokTestComponent {
  statisticTableListRequest?: BokStatisticTableListRequest;
  statisticSearchRequest?: BokStatisticSearchRequest;
  keyStatisticListRequest?: BokKeyStatisticRequest;
  constructor(private bokService: BokService) {
    this.initRequest();
  }

  initRequest(): void {
    this.statisticTableListRequest = new BokStatisticTableListRequest();
    this.statisticSearchRequest = new BokStatisticSearchRequest();
    this.keyStatisticListRequest = new BokKeyStatisticRequest();
  }
}
