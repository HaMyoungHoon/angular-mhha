import { Injectable } from '@angular/core';
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";

@Injectable({
  providedIn: 'root'
})
export class VideoStreamService {
  private videoUrl = "/apiSpring/v1/video";

  constructor(private httpResponse: HttpResponseInterceptorService) {
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
