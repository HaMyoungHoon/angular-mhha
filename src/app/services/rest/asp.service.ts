import { Injectable } from '@angular/core';
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/common/IRestResult";

@Injectable({
  providedIn: 'root'
})
export class AspService {
  private baseUrl = "/apiAsp/api";

  constructor(private httpResponse: HttpResponseInterceptorService) {
  }

  signIn(id: string, pw: string): Promise<IRestResult<string>> {
    this.httpResponse.addParam('id', id);
    this.httpResponse.addParam('pw', pw);
    return this.httpResponse.get(`${this.baseUrl}/User/GetSignIn`).then();
  }
}
