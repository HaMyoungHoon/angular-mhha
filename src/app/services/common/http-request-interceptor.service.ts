import {HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {auth_token, getSessionStorage} from "../../guards/amhohwa";

export const HttpRequestInterceptorService: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = getSessionStorage(auth_token)
  let reqHeader = req.headers;
  if (token) {
    reqHeader = reqHeader.set(auth_token, token);
  }

  return next(req.clone( { headers: reqHeader }))
}
