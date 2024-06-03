import { Injectable } from '@angular/core';
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/common/IRestResult";
import {HttpHeaders} from "@angular/common/http";
import {DocPage} from "../../models/doc/DocPage";
import {NewsItem} from "../../models/common/news-item";
import {DocMenuItem} from "../../models/common/doc-menu-item";

@Injectable({
  providedIn: 'root'
})
export class AngularCommonService {
  private baseUrl = "/apiSpring/angular/common";

  constructor(private httpResponse: HttpResponseInterceptorService) {
    this.httpResponse.options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
  }

  getNews(): Promise<IRestResult<NewsItem[]>> {
    const url = `${this.baseUrl}/get/news`;
    return this.httpResponse.get(url).then();
  }
  getNewsOne(): Promise<IRestResult<NewsItem>> {
    const url = `${this.baseUrl}/get/news/one`;
    return this.httpResponse.get(url).then();
  }
  getMenu(): Promise<IRestResult<DocMenuItem[]>> {
    const url = `${this.baseUrl}/get/doc_menu`;
    return this.httpResponse.get(url).then();
  }

  getDocPage(): Promise<IRestResult<DocPage[]>> {
    return this.httpResponse.get(`${this.baseUrl}/doc/menu/get/doc`).then();
  }
}
