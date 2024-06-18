import { Injectable } from "@angular/core";
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {HttpHeaders} from "@angular/common/http";
import {BokResponse} from "../../models/rest/bok/bok-response";
import {BokKeyStatisticRequest} from "../../models/rest/bok/bok-key-statistic-request";
import {BokStatisticSearchRequest} from "../../models/rest/bok/bok-statistic-search-request";
import {BokStatisticTableListRequest} from "../../models/rest/bok/bok-statistic-table-list-request";

@Injectable({
  providedIn: "root"
})
export class BokService {
  private baseUrl = "/apiBOK/api";
  private tablePath = "/StatisticTableList";
  private tableItemPath = "/StatisticItemList"

  constructor(private httpResponse: HttpResponseInterceptorService) {
    this.httpResponse.options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
  }

  getKeyStatisticList(data: BokKeyStatisticRequest): Promise<BokResponse> {
    const url = `${this.baseUrl}/${data.getUrl()}`;
    return this.httpResponse.getAny(url, this.httpResponse.options).then();
  }
  getStatisticSearch(data: BokStatisticSearchRequest): Promise<BokResponse> {
    let url = `${this.baseUrl}/${data.getUrl()}`;
    return this.httpResponse.getAny(url, this.httpResponse.options).then();
  }
  getStatisticTableList(data: BokStatisticTableListRequest): Promise<BokResponse> {
    const url = `${this.baseUrl}${this.tablePath}/${data.getUrl()}`;
    return this.httpResponse.getAny(url, this.httpResponse.options).then();
  }
  getStatisticTableItem(data: BokStatisticTableListRequest): Promise<BokResponse> {
    const url = `${this.baseUrl}${this.tableItemPath}/${data.getUrl()}`;
    return this.httpResponse.getAny(url, this.httpResponse.options).then();
  }
}
