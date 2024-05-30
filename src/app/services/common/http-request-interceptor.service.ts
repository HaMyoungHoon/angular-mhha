import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {auth_token, getSessionStorage} from "../../guards/amhohwa";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getSessionStorage(auth_token)
    let reqHeader = req.headers;
    if (token) {
      reqHeader = reqHeader.set(auth_token, token);
    }

    return next.handle(req.clone( { headers: reqHeader }))
  }
}
