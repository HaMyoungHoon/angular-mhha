import { Injectable } from '@angular/core';
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/rest/IRestResult";
import {HttpHeaders} from "@angular/common/http";
import {DocPage} from "../../models/doc/DocPage";

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

  getDocPage(): Promise<IRestResult<DocPage[]>> {
    return this.httpResponse.get(`${this.baseUrl}/doc/menu/get/doc`).then();
  }
}
