import { Injectable } from '@angular/core';
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/common/IRestResult";
import {VideoCategoryModel} from "../../models/rest/file/video/video-category-model";
import {VideoModel} from "../../models/rest/file/video/video-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoStreamService {
  private videoUrl = "/apiSpring/v1/video";

  constructor(private httpResponse: HttpResponseInterceptorService) {
  }

  getCategoryList(): Promise<IRestResult<VideoCategoryModel[]>> {
    const url = `${this.videoUrl}/get/category/list`;
    return this.httpResponse.get(url);
  }
  getCategoryRootList(): Promise<IRestResult<VideoCategoryModel[]>> {
    const url = `${this.videoUrl}/get/category/list/root`;
    return this.httpResponse.get(url);
  }
  getVideoByDirname(dirName: string): Promise<IRestResult<VideoCategoryModel>> {
    const url = `${this.videoUrl}/get/category/list/withVideo`;
    this.httpResponse.addParam('dirName', dirName);
    return this.httpResponse.get(url);
  }
  getVideoList(): Promise<IRestResult<VideoModel[]>> {
    const url = `${this.videoUrl}/get/video/list`;
    return this.httpResponse.get(url);
  }
  getVideoSearch(searchValue: string): Promise<IRestResult<VideoModel[]>> {
    const url = `${this.videoUrl}/get/video/list/searchString/${searchValue}`;
    return this.httpResponse.get(url);
  }
  getVideoStream(thisIndex: number): Promise<any> {
    return this.httpResponse.getBlob(this.getVideoResourceUrl(thisIndex));
  }
//  getVideoStream(thisIndex: number): Observable<any> {
//    return this.httpResponse.requestAny("get",this.getVideoStreamUrl(thisIndex));
//  }
  getVideoResource(thisIndex: number): Observable<any> {
    return this.httpResponse.requestAny("get", this.getVideoResourceUrl(thisIndex));
  }
  getVideoByte(thisIndex: number): Observable<any> {
    return this.httpResponse.requestAny("get", this.getVideoByteUrl(thisIndex));
  }

  getVideoStreamUrl(thisIndex: number): string {
    return `${this.videoUrl}/get/play/stream/index/${thisIndex}`
  }
  getVideoResourceUrl(thisIndex: number): string {
    return `${this.videoUrl}/get/play/resource/index/${thisIndex}`
  }
  getVideoByteUrl(thisIndex: number): string {
    return `${this.videoUrl}/get/play/byte/index/${thisIndex}`
  }
}
