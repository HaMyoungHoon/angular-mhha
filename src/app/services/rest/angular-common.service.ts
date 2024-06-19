import { Injectable } from "@angular/core";
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/common/IRestResult";
import {NewsItem} from "../../models/rest/news/news-item";
import {DocMenuItem} from "../../models/rest/doc/doc-menu-item";

@Injectable({
  providedIn: "root"
})
export class AngularCommonService {
  private baseUrl = "/apiSpring/angular";

  constructor(private httpResponse: HttpResponseInterceptorService) {
  }

  getNews(): Promise<IRestResult<NewsItem[]>> {
    const url = `${this.baseUrl}/common/get/news`;
    return this.httpResponse.get(url).then();
  }
  getNewsOne(): Promise<IRestResult<NewsItem>> {
    const url = `${this.baseUrl}/common/get/news/one`;
    return this.httpResponse.get(url).then();
  }
  getMenu(): Promise<IRestResult<DocMenuItem[]>> {
    const url = `${this.baseUrl}/doc/get/menu`;
    return this.httpResponse.get(url).then();
  }
}
