import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {getToken, } from "../../guards/amhohwa";
import {AUTH_TOKEN} from "../../guards/f-constants";

export const HttpRequestInterceptorService: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = getToken();
  let reqHeader = req.headers;
  if (token) {
    reqHeader = reqHeader.set(AUTH_TOKEN, token);
  }

  return next(req.clone( { headers: reqHeader }))
}
