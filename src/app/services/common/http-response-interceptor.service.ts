import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IRestResult} from "../../models/common/IRestResult";
import {lastValueFrom, map} from "rxjs";
import {ApiValidationService} from "./api-validation.service";

@Injectable({
  providedIn: 'root'
})
export class HttpResponseInterceptorService {
  options?: {
    headers?: HttpHeaders | { [ header: string ]: string | string[] },
    observe?: "body",
    params?: HttpParams | { [ param: string ]: string | string[] },
    reportProgress?: boolean,
    responseType?: "json",
    withCredentials?: boolean,
  }

  constructor(private http: HttpClient) {
  }
  get<T = any>(url: string): Promise<IRestResult<T>> {
    return lastValueFrom(this.http.get<IRestResult<T>>(url, this.options).pipe(
      map(response => response)
    ));
  }
  post<T = any>(url: string, param?: any): Promise<IRestResult<T>> {
    return lastValueFrom(this.http.post<IRestResult<T>>(url, param, this.options).pipe(
      map(response => response)
    ));
  }
  put<T = any>(url: string, param?: any): Promise<IRestResult<T>> {
    return lastValueFrom(this.http.put<IRestResult<T>>(url, param, this.options).pipe(
      map(response => response)
    ));
  }
  delete<T = any>(url: string): Promise<IRestResult<T>> {
    return lastValueFrom(this.http.delete<IRestResult<T>>(url, this.options).pipe(
      map(response => response)
    ));
  }
  getAny<T = any>(url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: "body",
    params?: HttpParams | {[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: "json",
    withCredentials?: boolean,
  }): Promise<T> {
    return lastValueFrom(this.http.get<T>(url, options).pipe(
      map(response => response)
    ));
  }
  postAny<T = any>(url: string, param?: FormData, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: "body",
    params?: HttpParams | {[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: "json",
    withCredentials?: boolean,
  }): Promise<T> {
    return lastValueFrom(this.http.post<T>(url, param).pipe(
      map(response => response)
    ));
  }
}
