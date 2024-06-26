import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApiValidationService {

  constructor() { }

  public validateResponse(response: any): Promise<any> {
    if (response.success) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }
}
