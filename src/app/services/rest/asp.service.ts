import { Injectable } from "@angular/core";
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/common/IRestResult";
import {Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AspService {
  private baseUrl = "/apiAsp/api";

  constructor(private httpResponse: HttpResponseInterceptorService) {
  }

  signIn(id: string, pw: string): Promise<IRestResult<string>> {
    this.httpResponse.addParam("id", id);
    this.httpResponse.addParam("pw", pw);
    return this.httpResponse.get(`${this.baseUrl}/User/GetSignIn`).then();
  }

  pdfToWord(file: any, password: string | undefined = undefined): Observable<any> {
    let url = `${this.baseUrl}/PdfConverter/PostPdfToWord`;
    if (password) {
      url += `?password=${password}`;
    }
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpResponse.postBlob(url, formData);
  }
}
