import { Injectable } from "@angular/core";
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/common/IRestResult";
import {WriteDirectory} from "../../models/rest/write/write-directory";
import {WriteFile} from "../../models/rest/write/write-file";

@Injectable({
  providedIn: "root"
})
export class AngularWriteService {
  private baseUrl = "/apiSpring/angular/write";

  constructor(private httpResponse: HttpResponseInterceptorService) {
  }

  getWriteDir(): Promise<IRestResult<WriteDirectory[]>> {
    return this.httpResponse.get(`${this.baseUrl}/get/directory`).then();
  }
  getWriteDirName(name: string): Promise<IRestResult<WriteDirectory>> {
    this.httpResponse.addParam("name", name);
    return this.httpResponse.get(`${this.baseUrl}/get/directory/name`).then();
  }
  getWriteDirNameFiles(name: string): Promise<IRestResult<WriteDirectory>> {
    this.httpResponse.addParam("name", name);
    return this.httpResponse.get(`${this.baseUrl}/get/directory/name/files`).then();
  }

  getWriteFileAll(): Promise<IRestResult<WriteFile[]>> {
    return this.httpResponse.get(`${this.baseUrl}/get/file/all`).then();
  }
  getWriteFile(name: string): Promise<IRestResult<WriteFile>> {
    this.httpResponse.addParam("name", name);
    return this.httpResponse.get(`${this.baseUrl}/get/file/name`).then();
  }
  postWriteFile(dirName: string, data: WriteFile): Promise<IRestResult<WriteFile>> {
    this.httpResponse.addParam("dirName", dirName);
    return this.httpResponse.post(`${this.baseUrl}/post/file`, data).then();
  }
  editWriteFile(fileName: string, content: string): Promise<IRestResult<WriteFile>> {
    this.httpResponse.addParam("fileName", fileName);
    return this.httpResponse.put(`${this.baseUrl}/put/file`, content).then();
  }
}
