import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';
import {VideoStreamService} from "../../../../services/rest/video-stream.service";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {HttpEventType} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-video-test',
  templateUrl: './video-test.component.html',
  styleUrl: './video-test.component.scss'
})
export class VideoTestComponent {
  blobURl: any
  constructor(private cd: ChangeDetectorRef, private videoStreamService: VideoStreamService, private fDialogService: FDialogService,
              private sanitizer: DomSanitizer) {
    afterNextRender(() => {
      this.cd.markForCheck();
      this.init();
    });
  }

  getVideoData(): void {
  }
  init(): void {
    this.getVideoData();
//    this.videoStreamService.getVideoTest(1).pipe().subscribe({
//      next: (event: HttpEvent<string>) => {
//        switch (event.type) {
//          case HttpEventType.Sent: {
//            console.log(`getVideoByte event type Sent`);
//            console.log(event);
//          }
//          break;
//          case HttpEventType.UploadProgress: {
//            console.log(`getVideoByte event type UploadProgress`);
//            console.log(event);
//          }
//          break;
//          case HttpEventType.ResponseHeader: {
//            console.log(`getVideoByte event type ResponseHeader`);
//            console.log(event);
//          }
//          break;
//          case HttpEventType.DownloadProgress: {
//            if (this.streamCount > 1) {
//              return;
//            }
//            this.streamCount++;
//            // @ts-ignore
////            this.streamData += event.partialText;
////            this.cd.detectChanges();
//            console.log("getVideoByte event type DownloadProgress");
//            console.log(event);
//          }
//          break;
//          case HttpEventType.Response: {
//            console.log("getVideoByte event type Response");
//            console.log(event);
//          }
//          break;
//          default: {
//            console.log(`getVideoByte event type ${event.type}`);
//            console.log(event);
//          }
//        }
//      },
//      error: (x) => {
//        console.log("getVideoByte catch");
//        console.log(x);
//      }
//    });
  }
}
