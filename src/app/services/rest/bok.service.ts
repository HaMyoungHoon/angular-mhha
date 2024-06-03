import { Injectable } from '@angular/core';
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {HttpHeaders} from "@angular/common/http";
import {BokResponse} from "../../models/rest/bok/bok-response";
import {BokKeyStatisticRequest} from "../../models/rest/bok/bok-key-statistic-request";
import {BokStatisticSearchRequest} from "../../models/rest/bok/bok-statistic-search-request";
import {BokStatisticTableListRequest} from "../../models/rest/bok/bok-statistic-table-list-request";

@Injectable({
  providedIn: 'root'
})
export class BokService {
  private baseUrl = "/apiBOK/api";
  private tablePath = "/StatisticTableList";
  private searchPath = "/StatisticSearch";
  private keyStatisticPath = "/KeyStatisticList"

  constructor(private httpResponse: HttpResponseInterceptorService) {
    this.httpResponse.options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
  }

  getKeyStatisticList(data: BokKeyStatisticRequest): Promise<BokResponse> {
    const url = `${this.baseUrl}${this.keyStatisticPath}/${data.authKey}/json/${data.langType}/${data.startNumber}/${data.endNumber}`;
    return this.httpResponse.getAny(url, this.httpResponse.options).then();
  }
  getStatisticSearch(data: BokStatisticSearchRequest): Promise<BokResponse> {
    let url = `${this.baseUrl}${this.searchPath}/${data.authKey}/json/${data.langType}/${data.startNumber}/${data.endNumber}/${data.code}/${data.cycle}/${data.startDate}/${data.endDate}`;
    if (data.listCode1) url += `/${data.listCode1}`;
    if (data.listCode2) url += `/${data.listCode2}`;
    if (data.listCode3) url += `/${data.listCode3}`;
    if (data.listCode4) url += `/${data.listCode4}`;
    return this.httpResponse.getAny(url, this.httpResponse.options).then();
  }
  getStatisticTableList(data: BokStatisticTableListRequest): Promise<BokResponse> {
    let url = `${this.baseUrl}${this.tablePath}/${data.authKey}/json/${data.langType}/${data.startNumber}/${data.endNumber}`;
    if (data.code) url += `/${data.code}`;
    return this.httpResponse.getAny(url, this.httpResponse.options).then();
  }
}
