import { Component } from '@angular/core';
import {BokService} from "../../../../services/rest/bok.service";
import {BokKeyStatisticRequest} from "../../../../models/rest/bok/bok-key-statistic-request";
import {BokStatisticSearchRequest} from "../../../../models/rest/bok/bok-statistic-search-request";
import {BokStatisticTableListRequest} from "../../../../models/rest/bok/bok-statistic-table-list-request";

@Component({
  selector: 'app-bok-test',
  templateUrl: './bok-test.component.html',
  styleUrl: './bok-test.component.scss'
})
export class BokTestComponent {
  statisticTableListRequest?: BokStatisticTableListRequest;
  statisticSearchRequest?: BokStatisticSearchRequest;
  keyStatisticListRequest?: BokKeyStatisticRequest;
  constructor(private bokService: BokService) {
    this.initRequest();
    this.bokService.getStatisticTableList(this.statisticTableListRequest!!).then(x => {
      console.log(x);
    }).catch(x => {
      console.log(x);
    });
  }

  initRequest(): void {
    this.statisticTableListRequest = new class implements BokStatisticTableListRequest {
      authKey = "sample";
      langType = "kr";
      startNumber = 1;
      endNumber = 10;
    }
    this.statisticSearchRequest = new class implements BokStatisticSearchRequest {
      authKey = "sample";
      langType = "kr";
      startNumber = 1;
      endNumber = 10;
      code = "200Y001";
      cycle = "A";
      startDate = 2015;
      endDate = 2021;
      listCode1 = "10101";
    };
    this.keyStatisticListRequest = new class implements BokKeyStatisticRequest {
      authKey = "sample";
      langType = "kr";
      startNumber = 1;
      endNumber = 10;
    };
  }
}
