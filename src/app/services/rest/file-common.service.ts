import { Injectable } from "@angular/core";
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/common/IRestResult";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FileCommonService {
  private videoUrl = "/apiSpring/v1/video";

  constructor(private httpResponse: HttpResponseInterceptorService) {
  }

  getVideoStreamName(name: string): Promise<IRestResult<HttpResponse<[]>>> {
    const url = `${this.videoUrl}/get/video/name/stream`;
    this.httpResponse.addParam("fileName", name);
    return this.httpResponse.get(url).then();
  }
  getVideoStreamIndex(index: number): Promise<Blob> {
    const url = `${this.videoUrl}/get/video/index/stream`;
    this.httpResponse.addBlobParam("index", index);
    return this.httpResponse.getBlob(url).then();
  }
  getVideoResourceName(name: string): Promise<IRestResult<HttpResponse<[]>>> {
    const url = `${this.videoUrl}/get/video/name/resource`;
    this.httpResponse.addParam("fileName", name);
    return this.httpResponse.get(url).then();
  }
  getVideoResourceIndex(index: number): Promise<IRestResult<HttpResponse<[]>>> {
    const url = `${this.videoUrl}/get/video/index/resource`;
    this.httpResponse.addParam("index", index);
    return this.httpResponse.get(url).then();
  }
  getVideoRestIndex(index: number): Promise<IRestResult<Blob>> {
    const url = `${this.videoUrl}/get/rest/video/index/stream`;
    this.httpResponse.addParam("index", index);
    return this.httpResponse.get(url).then();
  }

  getVideoNameStreamUrl(name: string): string {
    return `${this.videoUrl}/get/video/index/stream?fileName=${name}`
  }
  getVideoIndexStreamUrl(index: number): string {
    return `${this.videoUrl}/get/video/index/stream?index=${index}`
  }
  getVideoNameResourceUrl(name: string): string {
    return `${this.videoUrl}/get/video/index/stream?fileName=${name}`
  }
  getVideoIndexResourceUrl(index: number): string {
    return `${this.videoUrl}/get/video/index/resource?index=${index}`
  }
}
