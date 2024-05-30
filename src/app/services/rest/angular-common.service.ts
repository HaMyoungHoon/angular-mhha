import { Injectable } from '@angular/core';
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/rest/IRestResult";
import {HttpHeaders} from "@angular/common/http";
import {DocPage} from "../../models/doc/DocPage";
import {NewsItem} from "../../models/common/news-item";

@Injectable({
  providedIn: 'root'
})
export class AngularCommonService {
  private baseUrl = "/apiSpring/angular"

  constructor(private httpResponse: HttpResponseInterceptorService) {
    this.httpResponse.options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
  }

  getNews(): Promise<IRestResult<NewsItem[]>> {
    const url = `${this.baseUrl}/common/get/news`;
    return this.httpResponse.get(url).then();
  }
  getNewsOne(): Promise<IRestResult<NewsItem>> {
    const url = `${this.baseUrl}/common/get/news/one`;
    return this.httpResponse.get(url).then();
  }
  getDocPage(): Promise<IRestResult<DocPage[]>> {
    return this.httpResponse.get(`${this.baseUrl}/doc/menu/get/doc`).then();
  }
}
